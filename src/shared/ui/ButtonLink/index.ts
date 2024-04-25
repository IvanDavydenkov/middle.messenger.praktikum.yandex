import { Block } from '@/entities/Block.ts'
import cl from './ButtonLink.module.scss'

export class ButtonLink extends Block {
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
    <button class=${cl.btn} name='{{name}}'><span>{{label}}</span></button>`
  }
}
