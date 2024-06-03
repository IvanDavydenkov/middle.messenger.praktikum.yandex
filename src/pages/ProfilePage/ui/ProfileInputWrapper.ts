import { Block } from '@/entities/Block.ts'
import cl from './ProfileInputWrapper.module.scss'
import { ProfileInput } from '@/pages/ProfilePage/ui/ProfileInput.ts'

export class ProfileInputWrapper extends Block {
  constructor(props: Record<string | symbol, unknown>) {
    super({
      ...props,
      Input: new ProfileInput({
        ...props,
      }),
    })
  }

  render() {
    return `
        <label class=${cl.label}>
        <span>{{label}}</span>
        <div class=${cl.inputWrapper}>
        
          {{{Input}}}
            {{#if error}}
            <p class=${cl.error}>{{errorText}}</p>
            {{/if}}
         </div>
          
        
     
    </label>
    `
  }
}
