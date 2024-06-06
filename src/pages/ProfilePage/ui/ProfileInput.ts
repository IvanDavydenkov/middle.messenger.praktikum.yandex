import cl from './ProfileInput.module.scss'
import { Block } from '@/entities/Block.ts'

export class ProfileInput extends Block {
  constructor(props: Record<string | symbol, unknown>) {
    console.log(props)
    super({
      ...props,
      events: {
        blur: props.onBlur,
      },
    })
  }

  render() {
    return `   
    <Input class=${cl.input} value="{{value}}" type="{{type}}" name="{{name}}">
    `
  }
}
