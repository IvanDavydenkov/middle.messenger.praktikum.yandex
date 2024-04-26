import { Block } from '@/entities/Block.ts'
import cl from './input.module.scss'

export class Input extends Block {
  constructor(props) {
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
