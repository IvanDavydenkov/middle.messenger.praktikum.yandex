//language=hbs
import cl from './styles.module.scss'

export const NotFoundPage = `
    <main class=${cl.main}>
        <div class=${cl.content}>
            <h1 class=${cl.title}>404</h1>
            <p class=${cl.subtitle}>Не туда попали</p>
            <a class=${cl.link} href="/chat">Назад к чатам</a>
        </div>
    </main>`
