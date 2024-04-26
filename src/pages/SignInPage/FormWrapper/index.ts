import { Block } from '@/entities/Block.ts'
import cl from './styles.module.scss'
import { Button, ButtonLink, InputElement } from '@/shared/ui'
import { regulars } from '@/shared/lib/validator.ts'

export class SignIn extends Block {
  constructor(props: Record<string | symbol, unknown>) {
    super({ ...props })
  }

  init() {
    const onChangeLogin = this.onChangeLogin.bind(this)
    const onChangePassword = this.onChangePassword.bind(this)
    const onLogin = this.onLogin.bind(this)

    const InputLogin = new InputElement({
      label: 'login',
      name: 'login',
      type: 'text',
      onBlur: onChangeLogin,
    })

    const InputPassword = new InputElement({
      label: 'password',
      name: 'password',
      type: 'password',
      onBlur: onChangePassword,
    })

    const SignInButton = new Button({
      label: 'Авторизоваться',
      onClick: onLogin,
    })
    const SignUpButton = new ButtonLink({
      label: 'Нет аккаунта?',
    })

    this.children = {
      ...this.children,
      InputLogin,
      InputPassword,
      SignInButton,
      SignUpButton,
    }
  }

  onChangeLogin(e: InputEvent) {
    const inputTarget = e.target as HTMLInputElement
    const inputValue = inputTarget.value
    if (!regulars.name.regular.test(inputValue)) {
      this.children.InputLogin.setProps({
        error: true,
        errorText: regulars.name.errorText,
      })
      return
    } else {
      this.children.InputLogin.setProps({ error: false, errorText: null })
    }

    this.setProps({ login: inputValue })
  }

  onChangePassword(e: InputEvent) {
    const inputTarget = e.target as HTMLInputElement
    const inputValue = inputTarget.value
    if (!regulars.password.regular.test(inputValue)) {
      this.children.InputPassword.setProps({
        error: true,
        errorText: regulars.password.errorText,
      })
      return
    } else {
      this.children.InputPassword.setProps({ error: false, errorText: null })
    }

    this.setProps({ password: inputValue })
  }

  onLogin(event: Event) {
    event.preventDefault()
    console.log(this.props)
  }

  render() {
    return ` 
        <section class=${cl.section}>
            <h1 class=${cl.title}>{{title}}</h1>
            <form class=${cl.form}>
                <div class=${cl.inputWrapper}>
                      {{{ InputLogin }}}
                      {{{ InputPassword }}}
                </div>
                <div class=${cl.btnWrapper}>
                    <a href='/signin'>
                    
                      {{{ SignInButton }}}
                    </a>
                    <a href='/signup'>
                       {{{ SignUpButton }}}
                    </a>
                </div>
            </form>

        </section>`
  }
}
