import { Block } from '@/entities/Block.ts'
import cl from './styles.module.scss'
import { Input } from '@/shared/ui/Input/Input.ts'

export class InputElement extends Block {
  constructor(props) {
    super({
      ...props,
      Input: new Input({
        ...props,
      }),
    })
  }

  render() {
    return `
          <label class=${cl.label}>
              <span>{{label}}</span>
              {{{Input}}}
              {{#if error}}
              <p class=${cl.error}>{{errorText}}</p>
              {{/if}}
          </label>
         `
  }
}
