import { Block } from '@/entities/Block.ts'
import { Button, ButtonLink, InputElement } from '@/shared/ui'
import cl from '@/pages/SignInPage/FormWrapper/styles.module.scss'
import { regulars } from '@/shared/lib/validator.ts'

export class SignUp extends Block {
  constructor(props: Record<string | symbol, unknown>) {
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

    const InputEmail = new InputElement({
      type: 'email',
      label: 'Почта',
      name: 'email',
      onBlur: onChangeEmail,
    })
    const InputPasswordRepeat = new InputElement({
      type: 'password',
      label: 'Повторите пароль',
      name: 'repeatPassword',
      onBlur: onChangePasswordRepeat,
    })

    const InputName = new InputElement({
      type: 'text',
      label: 'Имя',
      name: 'name',
      onBlur: onChangeName,
    })
    const InputSecondName = new InputElement({
      type: 'text',
      label: 'Фамилия',
      name: 'secondName',
      onBlur: onChangeSecondName,
    })
    const InputPhone = new InputElement({
      type: 'number',
      label: 'Телефон',
      name: 'phone',
      onBlur: onChangePhone,
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
      InputEmail,
      InputPasswordRepeat,
      InputName,
      InputSecondName,
      InputPhone,
    }
  }

  onChangeLogin(e: InputEvent) {
    const inputTarget = e.target as HTMLInputElement
    const inputValue = inputTarget.value
    if (!regulars.login.regular.test(inputValue)) {
      this.children.InputLogin.setProps({
        error: true,
        errorText: regulars.login.errorText,
      })
      return
    } else {
      this.children.InputLogin.setProps({ error: false, errorText: null })
    }

    this.setProps({ login: inputValue })
  }

  onChangeEmail(e: InputEvent) {
    const inputTarget = e.target as HTMLInputElement
    const inputValue = inputTarget.value
    if (!regulars.email.regular.test(inputValue)) {
      this.children.InputEmail.setProps({
        error: true,
        errorText: regulars.email.errorText,
      })
      return
    } else {
      this.children.InputEmail.setProps({ error: false, errorText: null })
    }

    this.setProps({ email: inputValue })
  }

  onChangePasswordRepeat(e: InputEvent) {
    const inputTarget = e.target as HTMLInputElement
    const inputValue = inputTarget.value
    if (inputValue !== this.props.password) {
      this.children.InputPasswordRepeat.setProps({
        error: true,
        errorText: 'Пароли должны совпадать',
      })
      return
    } else {
      this.children.InputPasswordRepeat.setProps({
        error: false,
        errorText: null,
      })
    }

    this.setProps({ passwordRepeat: inputValue })
  }

  onChangeName(e: InputEvent) {
    const inputTarget = e.target as HTMLInputElement
    const inputValue = inputTarget.value
    if (!regulars.name.regular.test(inputValue)) {
      this.children.InputName.setProps({
        error: true,
        errorText: regulars.name.errorText,
      })
      return
    } else {
      this.children.InputName.setProps({ error: false, errorText: null })
    }

    this.setProps({ name: inputValue })
  }

  onChangeSecondName(e: InputEvent) {
    const inputTarget = e.target as HTMLInputElement
    const inputValue = inputTarget.value
    if (!regulars.name.regular.test(inputValue)) {
      this.children.InputSecondName.setProps({
        error: true,
        errorText: regulars.name.errorText,
      })
      return
    } else {
      this.children.InputSecondName.setProps({ error: false, errorText: null })
    }

    this.setProps({ secondName: inputValue })
  }

  onChangePhone(e: InputEvent) {
    const inputTarget = e.target as HTMLInputElement
    const inputValue = inputTarget.value
    if (!regulars.phone.regular.test(inputValue)) {
      this.children.InputPhone.setProps({
        error: true,
        errorText: regulars.phone.errorText,
      })
      return
    } else {
      this.children.InputPhone.setProps({ error: false, errorText: null })
    }

    this.setProps({ phone: inputValue })
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
                      {{{ InputEmail }}}
                      {{{ InputEmail }}}
                      {{{ InputName }}}
                      {{{ InputSecondName }}}
                      {{{ InputPhone }}}
                      {{{ InputPassword }}}
                      {{{ InputPasswordRepeat }}}
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
