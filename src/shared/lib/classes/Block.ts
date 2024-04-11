import { EventBus } from '@/shared/lib/classes/EventBus.ts'
import { v4 as getId } from 'uuid'

export interface Props {
  [key: string]: string
}

export class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  }
  _meta: { tagName: string; props: Props }
  _id: string
  private eventBus: () => EventBus

  constructor(tagName = 'div', props = {}) {
    const eventBus = new EventBus()
    this._meta = {
      tagName,
      props,
    }
    this._id = getId()
    this._props = this._makePropsProxy(props)

    this.eventBus = (): EventBus => eventBus

    this._registerEvents(eventBus)
    eventBus.emit(Block.EVENTS.INIT)
  }

  get element(): HTMLElement {
    return this._element
  }

  _props: Props

  get props() {
    return this._props
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
  }

  _createResources() {
    const { tagName } = this._meta
    this._element = this._createDocumentElement(tagName)
  }

  init() {
    this._createResources()
    this._render()
  }

  _componentDidMount() {
    this.componentDidMount()
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
  }

  componentDidMount() {}

  _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps)
    if (response) {
      this._render()
    }
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    if (oldProps === newProps) return false
    return true
  }

  setProps(nextProps: Props) {
    if (!nextProps) {
      return
    }
    if (typeof nextProps !== 'object') {
      throw new Error('Props must be an object')
    }
    Object.assign(this._props, nextProps)
    this.eventBus().emit(Block.EVENTS.FLOW_CDU, this.props, nextProps)
  }

  _render() {
    const block = this.render()
    this._element.innerHTML = block
  }

  render() {}

  getContent() {
    return this.element
  }

  _makePropsProxy(props: Props) {
    return new Proxy(props, {
      set: (target: Props, prop: string, value: unknown, receiver) => {
        const result = Reflect.set(target, prop, value, receiver)
        if (!result) throw new Error('Ошибка')
        this._meta.props = this.props
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, this._meta.props, target)
        return true
      },
      deleteProperty: () => {
        throw new Error('Нет доступа')
      },
    })
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName)
  }

  show() {
    this._element.style.display = 'block'
  }

  hide() {
    this._element.style.display = 'none'
  }
}
