//language=hbs
import { Block } from '@/entities/Block.ts'
import cl from './ProfileInputWrapper.module.scss'
import { ProfileInput } from '@/pages/ProfilePage/ui/ProfileInput.ts'

export class ProfileInputWrapper extends Block {
  constructor(props: Record<string | symbol, unknown>) {
    super({
      ...props,
      Input: new ProfileInput({}),
    })
  }

  render() {
    return `
        <label class=${cl.label}>
        <span>{{label}}</span>
        {{{ProfileInput}}}
    </label>
    `
  }
}
