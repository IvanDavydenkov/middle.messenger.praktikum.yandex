import cl from './styles.module.scss'
import Handlebars from 'handlebars'
import { ArrowSendMessage } from '@/shared/icons/ArrowSendMessage.ts'
import { Block } from '@/entities/Block.ts'
import { regulars } from '@/shared/lib/validator.ts'
import { NavBar } from '@/shared/NavBar'
import { ProfileInputWrapper } from '@/pages/ProfilePage/ui/ProfileInputWrapper.ts'

Handlebars.registerPartial('ArrowSendMessage', ArrowSendMessage)

export class ProfilePage extends Block {
  constructor(props: Record<string | symbol, unknown>) {
    super({
      ...props,
      NavBar: new NavBar({}),
    })
    this.children = {}
  }

  init() {
    const onChangeLogin = this.onChangeLogin.bind(this)
    const onChangePassword = this.onChangePassword.bind(this)
    const onChangePasswordRepeat = this.onChangePasswordRepeat.bind(this)
    const onChangeEmail = this.onChangeEmail.bind(this)
    const onChangeName = this.onChangeName.bind(this)
    const onChangeSecondName = this.onChangeSecondName.bind(this)
    const onChangePhone = this.onChangePhone.bind(this)
    const onSave = this.onSave.bind(this)

    const InputLogin = new ProfileInputWrapper({
      label: 'login',
      name: 'login',
      type: 'text',
      onBlur: onChangeLogin,
    })

    const InputPassword = new ProfileInputWrapper({
      label: 'password',
      name: 'password',
      type: 'password',
      onBlur: onChangePassword,
    })

    const InputEmail = new ProfileInputWrapper({
      type: 'email',
      label: 'Почта',
      name: 'email',
      onBlur: onChangeEmail,
    })
    const InputPasswordRepeat = new ProfileInputWrapper({
      type: 'password',
      label: 'Повторите пароль',
      name: 'repeatPassword',
      onBlur: onChangePasswordRepeat,
    })

    const InputName = new ProfileInputWrapper({
      type: 'text',
      label: 'Имя',
      name: 'name',
      onBlur: onChangeName,
    })
    const InputSecondName = new ProfileInputWrapper({
      type: 'text',
      label: 'Фамилия',
      name: 'secondName',
      onBlur: onChangeSecondName,
    })
    const InputPhone = new ProfileInputWrapper({
      type: 'number',
      label: 'Телефон',
      name: 'phone',
      onBlur: onChangePhone,
    })
    const SaveButton = new ProfileInputWrapper({
      label: 'Сохранить',
      onClick: onSave,
    })

    this.children = {
      ...this.children,
      InputLogin,
      InputPassword,
      SaveButton,
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

  onSave(event: Event) {
    event.preventDefault()
    console.log(this.props)
  }

  render() {
    return `    
    <main class=${cl.section}>
    {{{ NavBar }}}
        <div class=${cl.sidebar}>
        <a href="/chat">
        {{>ArrowSendMessage}}
        </a>
        </div>
        <div class=${cl.container}>
         <form class=${cl.form}>
            <img class=${cl.img} src="https://lapkins.ru/upload/iblock/d44/d44fb8e4580b59ba1b09440270cd6fac.jpg"/>
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
            {{{ SaveButton }}}
        </form>
        </div>       
    </main>
    `
  }
}
