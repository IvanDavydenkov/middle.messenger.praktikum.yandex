import { Block } from '@/entities/Block.ts'
import cl from './styles.module.scss'
import { Button, ButtonLink, Input } from '@/shared/ui'

export class SignIn extends Block {
  constructor(props) {
    super({ ...props })
  }

  init() {
    const onChangeLogin = this.onChangeLogin.bind(this)
    const onChangePassword = this.onChangePassword.bind(this)
    const onLogin = this.onLogin.bind(this)

    const InputLogin = new Input({
      label: 'login',
      name: 'login',
      type: 'text',
      onBlur: onChangeLogin,
    })

    const InputPassword = new Input({
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

  onChangeLogin(e) {
    const inputValue = e.target.value
    if (inputValue === 'error') {
      this.children.InputLogin.setProps({
        error: true,
        errorText: 'some error',
      })
      return
    } else {
      this.children.InputLogin.setProps({ error: false, errorText: null })
    }

    this.setProps({ login: inputValue })
  }

  onChangePassword(e) {
    const inputValue = e.target.value
    if (inputValue === 'error') {
      this.children.InputPassword.setProps({
        error: true,
        errorText: 'some error',
      })
      return
    } else {
      this.children.InputPassword.setProps({ error: false, errorText: null })
    }

    this.setProps({ password: inputValue })
  }

  onLogin(event) {
    event.preventDefault()
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
