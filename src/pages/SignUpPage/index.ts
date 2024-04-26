//language=hbs
import cl from './styles.module.scss'
import { Block } from '@/entities/Block.ts'
import { NavBar } from '@/shared/NavBar'
import { SignUp } from '@/pages/SignUpPage/FormSignup'

export const SignUpPage1 = `
    <section class=${cl.main}>
        {{> NavBar}}
        <section class=${cl.section}>
            <h1 class=${cl.title}>Регистрация</h1>
            <form class=${cl.form}>
                <div class=${cl.inputWrapper}>
                    {{>Input type='text' label='Логин' value='IvanDavydenkov' name='login'}}
                    {{>Input type='email' label='Почта' value='ivan@davydenkov' name='email'}}
                    {{>Input type='text' label='Имя' value='Ivan' name='first_name'}}
                    {{>Input type='text' label='Фамилия' value='Davydenkov' name='second_name'}}
                    {{>Input type='number' label='Телефон' value='9772691478' name='phone'}}
                    {{>Input type='password' label='Пароль' value='Ivan' name='password'}}
                    {{>Input type='password' label='Пароль еще раз' value='Ivan'}}
                </div>
                <div class=${cl.btnWrapper}>
                    {{>Button label='Авторизоваться'}}
                    {{>ButtonLink label='Нет аккаунта?'}}
                </div>
            </form>
        </section>
    </section>`

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
