//language=hbs
import cl from './styles.module.scss'

export const SignInPage = `
    <section class=${cl.main}>
        <section class=${cl.section}>
            <h1 class=${cl.title}>Вход</h1>
            <form class=${cl.form}>
                <div class=${cl.inputWrapper}>
                    {{>Input type='text' label='Логин' value='Ivan' name='login'}}
                    {{>Input type='password' label='Пароль' value='Ivan' name='password'}}
                </div>
                <div class=${cl.btnWrapper}>
                    <a href='/signin'>
                        {{>Button label='Авторизоваться' name='Sign in'}}
                    </a>
                    <a href='/signup'>
                        {{>ButtonLink label='Нет аккаунта?' name='Sign up'}}
                    </a>
                </div>
            </form>

        </section>
    </section>`
