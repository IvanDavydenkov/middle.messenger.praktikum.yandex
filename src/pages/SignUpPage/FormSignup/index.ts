import { Block } from '@/entities/Block.ts'
import { Button, ButtonLink, Input } from '@/shared/ui'
import cl from '@/pages/SignInPage/FormWrapper/styles.module.scss'

export class SignUp extends Block {
  constructor(props) {
    super({ ...props })
  }

  init() {
    const onChangeLogin = this.onChangeLogin.bind(this)
    const onChangePassword = this.onChangePassword.bind(this)
    const onChangePasswordRepeat = this.onChangePasswordRepeat.bind(this)
    const onChangeEmail = this.onChangeEmail.bind(this)
    const onChangeName = this.onChangeName.bind(this)
    const onChangeSecondName = this.onChangeSecondName.bind(this)
    const onChangePhone = this.onChangePhone.bind(this)
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

    const InputEmail = new Input({
      type:'email',
      label:'Почта',
      name:'email'
      onBlur: onChangeEmail,
    })
    const SignInButton = new Button({
      label: 'Регистрация',
      onClick: onLogin,
    })
    const SignUpButton = new ButtonLink({
      label: 'Есть аккаунт?',
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
  onChangeEmail(e){

    .00. ,m ,n ,m-8-
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
                      {{{ InputEmail }}}
                
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
