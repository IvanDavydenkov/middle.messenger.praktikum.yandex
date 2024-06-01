import { EventBus } from './EventBus'
import { nanoid } from 'nanoid'
import Handlebars from 'handlebars'

interface BlockProps {
  events?: { [eventName: string]: (event: Event) => void }
}

interface Children {
  [key: string]: Block | { [key: string]: Block }
}

export class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  }

  _meta = null
  _id: string
  protected children: Children
  protected props: BlockProps & { [key: string]: unknown }
  private eventBus: () => EventBus

  constructor(
    propsWithChildren: Record<string, string | { [key: string]: string }> = {}
  ) {
    const eventBus = new EventBus()
    const { props, children } = this._getChildrenAndProps(propsWithChildren)

    this._id = nanoid(6)
    this.props = this._makePropsProxy({ ...props })
    this.children = children
    this.eventBus = () => eventBus

    this._registerEvents(eventBus)

    eventBus.emit(Block.EVENTS.INIT)
  }

  _element: Element | null = null

  get element(): Element | null {
    return this._element
  }

  _addEvents() {
    const { events = {} } = this.props

    Object.entries(events).forEach(([eventName, handler]) => {
      this._element?.addEventListener(eventName, handler)
    })
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  _init() {
    this.init()
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  init() {}

  _componentDidMount() {
    this.componentDidMount()
    console.log('CDM')

    Object.values(this.children).forEach((child) => {
      if (child instanceof Block) {
        child.dispatchComponentDidMount()
      }
    })
  }

  componentDidMount(
    _oldProps?: Record<string, string | { [key: string]: string }>
  ) {
    console.log(_oldProps)
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
  }

  _componentDidUpdate(
    oldProps: Record<string, string | { [key: string]: string }>,
    newProps: Record<string, string | { [key: string]: string }>
  ) {
    console.log(oldProps, newProps)
    const response = this.componentDidUpdate(oldProps, newProps)
    if (!response) {
      return
    }
    this._render()
  }

  componentDidUpdate(
    _oldProps: Record<string, string | { [key: string]: string }>,
    _newProps: Record<string, string | { [key: string]: string }>
  ) {
    console.log(_oldProps, _newProps)
    return true
  }

  _getChildrenAndProps(
    propsAndChildren: Record<string, string | { [key: string]: string }>
  ) {
    const children: Children = {}
    const props: Record<string, string | { [key: string]: string }> = {}

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value
      } else {
        props[key] = value
      }
    })

    return { children, props }
  }

  setProps = (
    nextProps: Record<string, string | { [key: string]: string }>
  ) => {
    if (!nextProps) {
      return
    }

    Object.assign(this.props, nextProps)
  }

  _render() {
    const propsAndStubs = { ...this.props }

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`
    })

    const fragment: HTMLElement = this._createDocumentElement('template')

    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs)

    const newElement = fragment.content.firstElementChild

    Object.values(this.children).forEach((child) => {
      if (!child) return
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`)

      stub?.replaceWith(child?.getContent())
    })

    if (this._element) {
      this._element?.replaceWith(newElement)
    }

    this._element = newElement

    this._addEvents()
  }

  render(): string {
    return ''
  }

  getContent(): Element | null {
    return this.element
  }

  _makePropsProxy(
    props: Record<string | symbol, unknown>
  ): Record<string, unknown> {
    return new Proxy(props, {
      get: (target, prop) => {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set: (target, prop, value) => {
        const oldTarget = { ...target }
        target[prop] = value

        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target)
        return true
      },
      deleteProperty() {
        throw new Error('Нет доступа')
      },
    })
  }

  _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName)
  }
}
