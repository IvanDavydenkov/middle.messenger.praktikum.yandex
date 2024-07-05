import { Block, BlockProps } from '@/entities/Block.ts'
import { render } from '../main'

type BlockConstructor = new () => Block

export class Route {
  private _pathname: string
  private _blockClass: BlockConstructor
  private _block: Block | null
  private _props: BlockProps

  constructor(pathname: string, view: BlockConstructor, props: BlockProps) {
    this._pathname = pathname
    this._blockClass = view
    this._block = null
    this._props = props
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname
      this.render()
    }
  }

  leave(): void {
    if (this._block) {
      this._block.hide()
    }
  }

  match(pathname: string): boolean {
    return pathname === this._pathname
  }

  render(): void {
    if (!this._block) {
      this._block = new this._blockClass()
      render(this._props.rootQuery, this._block)
      return
    }

    this._block.show()
  }
}

export function render(path: string, element: typeof Block): void {
  // const container = document.getElementById('app')
  //
  // if (!container) return
  // if (element instanceof Object) {
  //   const page = new element()
  //   container.innerHTML = ''
  //
  //   const source = page.getContent()
  //   if (!source) return
  //   container.append(source)
  //   return
  // }

  const CurrentPage = element

  if (!CurrentPage) return

  const container = document.getElementById('app')
  if (!container) return

  const pageInstance = CurrentPage
  container.innerHTML = ''

  const source = pageInstance.getContent()
  if (!source) return
  container.append(source)
}
