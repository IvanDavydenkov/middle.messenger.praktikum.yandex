interface EventCallback {
  (...args: unknown[]): void
}

interface Listeners {
  [event: string]: EventCallback[]
}

export class EventBus {
  private listeners: Listeners

  constructor() {
    this.listeners = {}
  }

  on(event: string, callback: EventCallback) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }

  off(event: string, callback: EventCallback) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }
    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    )
  }

  emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event]) {
      return
    }
    this.listeners[event].forEach((listener) => listener(...args))
  }
}
