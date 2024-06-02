import { EventBus } from './EventBus'
import { nanoid } from 'nanoid'
import Handlebars from 'handlebars'

type EventCallback = (...args: unknown[]) => void

interface BlockProps {
  events?: { [eventName: string]: (event: Event) => void }

  [key: string]: unknown
}

interface Children {
  [key: string]: Block | Block[]
}

type PropsWithChildren = {
  [key: string]: unknown
}

export class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  }

  _meta: null = null
  _id: string
  protected children: Children
  protected props: BlockProps
  private eventBus: () => EventBus

  constructor(propsWithChildren: PropsWithChildren = {}) {
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
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this) as EventCallback)
    eventBus.on(
      Block.EVENTS.FLOW_CDM,
      this._componentDidMount.bind(this) as EventCallback
    )
    eventBus.on(
      Block.EVENTS.FLOW_CDU,
      this._componentDidUpdate.bind(this) as EventCallback
    )
    eventBus.on(
      Block.EVENTS.FLOW_RENDER,
      this._render.bind(this) as EventCallback
    )
  }

  _init() {
    this.init()
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  init() {}

  _componentDidMount() {
    this.componentDidMount()

    Object.values(this.children).forEach((child) => {
      if (child instanceof Block) {
        child.dispatchComponentDidMount()
      } else if (Array.isArray(child)) {
        child.forEach((nestedChild) => {
          if (nestedChild instanceof Block) {
            nestedChild.dispatchComponentDidMount()
          }
        })
      }
    })
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
  }

  _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
    const response = this.componentDidUpdate(oldProps, newProps)
    if (!response) {
      return
    }
    this._render()
  }

  componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
    console.log(oldProps, newProps)
    return true
  }

  _getChildrenAndProps(propsAndChildren: PropsWithChildren) {
    const children: Children = {}
    const props: BlockProps = {}

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (
        value instanceof Block ||
        (Array.isArray(value) && value.every((item) => item instanceof Block))
      ) {
        children[key] = value
      } else {
        props[key] = value
      }
    })

    return { children, props }
  }

  setProps = (nextProps: BlockProps) => {
    if (!nextProps) {
      return
    }

    const oldProps = { ...this.props }
    Object.assign(this.props, nextProps)
    this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, this.props)
  }

  _render() {
    const propsAndStubs = { ...this.props }

    Object.entries(this.children).forEach(([key, child]) => {
      if (child instanceof Block) {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`
      } else if (Array.isArray(child)) {
        propsAndStubs[key] = child
          .map((nestedChild) => `<div data-id="${nestedChild._id}"></div>`)
          .join('')
      }
    })

    const fragment = this._createDocumentElement(
      'template'
    ) as HTMLTemplateElement

    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs)

    const newElement = fragment.content.firstElementChild

    Object.values(this.children).forEach((child) => {
      if (child instanceof Block) {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`)
        stub?.replaceWith(child.getContent()!)
      } else if (Array.isArray(child)) {
        child.forEach((nestedChild) => {
          const stub = fragment.content.querySelector(
            `[data-id="${nestedChild._id}"]`
          )
          stub?.replaceWith(nestedChild.getContent()!)
        })
      }
    })

    if (this._element) {
      this._element.replaceWith(newElement!)
    }

    this._element = newElement as Element

    this._addEvents()
  }

  render(): string {
    return ''
  }

  getContent(): Element | null {
    return this.element
  }

  _makePropsProxy(props: BlockProps): BlockProps {
    return new Proxy(props, {
      get: (target, prop: string) => {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set: (target, prop: string, value) => {
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
