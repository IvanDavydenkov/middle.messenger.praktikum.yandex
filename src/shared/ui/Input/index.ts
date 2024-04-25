import { Block } from '@/entities/Block.ts'
import cl from './Input.module.scss'

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
          <label class=${cl.label}>
              <span>{{label}}</span>
              <Input class=${cl.input} value="{{value}}" type="{{type}}" name="{{name}}">
          </label>
         `
  }
}
