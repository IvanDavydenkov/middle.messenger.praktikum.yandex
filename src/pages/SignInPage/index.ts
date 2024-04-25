import cl from './styles.module.scss'
import { Block } from '@/entities/Block.ts'
import { NavBar } from '@/shared/NavBar'
import { SignIn } from '@/pages/SignInPage/FormWrapper'

export class SignInPage extends Block {
  constructor(props) {
    super({
      ...props,
      NavBar: new NavBar({}),
      Form: new SignIn({ title: 'Вход' }),
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
