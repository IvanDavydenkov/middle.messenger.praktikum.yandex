//language=hbs
import cl from './styles.module.scss'
import { Block } from '@/entities/Block.ts'
import { NavBar } from '@/shared/NavBar'
import { SignUp } from '@/pages/SignUpPage/FormSignup'

export class SignUpPage extends Block {
  constructor(props: Record<string | symbol, unknown>) {
    super({
      ...props,
      NavBar: new NavBar({}),
      Form: new SignUp({ title: 'Регистрация' }),
    })
  }

  render() {
    return `
    <main class=${cl.main}>
        {{{ NavBar }}}
        {{{ Form }}}
    </main>`
  }
}
