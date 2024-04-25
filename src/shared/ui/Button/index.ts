import { Block } from '@/entities/Block.ts'
import cl from './Button.module.scss'

export class Button extends Block {
  constructor(props) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    })
  }

  render() {
    return `
      <button class=${cl.btn}><span>{{label}}</span></button>
     `
  }
}
