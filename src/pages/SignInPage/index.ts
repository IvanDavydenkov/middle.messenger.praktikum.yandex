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
                    {{>Button label='Авторизоваться'}}
                    {{>ButtonLink label='Нет аккаунта?'}}
                </div>
            </form>

        </section>
    </section>`