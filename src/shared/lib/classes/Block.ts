// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import {EventBus} from '@/shared/lib/classes/EventBus.ts'

export class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  }
  _props
  _children
  _id
  _meta
  _eventBus
  _setUpdate = false

  constructor(tagName: string = 'div', propsAndChildren = {}): void {
    const tagName = new EventBus()
    this.eventBus.emit(Block.EVENTS.INIT)
    this._id = makeUUID()
    this._children = children
    this.props = this._makePropsProxy({ ...props, _id: this.id })
    this._meta = {
      tagName,
      props,
    }
  }

  get element() {
    return this._element
  }

  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  _createResources() {
    const { tagName } = this._meta
    this._element = this._createDocumentElement(tagName)
  }

  init() {
    this._element = this._createDocumentElement(this._meta?.tagName)
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  _componentDidMount() {
    this.componentDidMount()
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
  }

  _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps)
    if (!response) {
      return
    }
    this._render()
  }

  componentDidUpdate(oldProps, newProps) {
    return true
  }

  setProps = (nextProps) => {
    if (!nextProps) {
      return
    }

    Object.assign(this.props, nextProps)
  }

  _render() {
    const block = this.render()
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    this._element.innerHTML = block
  }

  render() {}

  getContent() {
    return this.element
  }

  _makePropsProxy(props) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set(target, prop, value) {
        target[prop] = value

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target)
        return true
      },
      deleteProperty() {
        throw new Error('Нет доступа')
      },
    })
  }

  _createDocumentElement(tagName) {
    if (this._props.settings?.withInternalID) {
      document.createElement(tagName).setAttribute('data-id', this._id)
    }
    return document.createElement(tagName)
  }

  show() {
    this.getContent().style.display = 'block'
  }

  hide() {
    this.getContent().style.display = 'none'
  }
}
