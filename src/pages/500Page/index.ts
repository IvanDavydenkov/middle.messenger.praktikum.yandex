//language=hbs
import cl from './styles.module.scss'

export const ServerErrorPage = `
    <main class=${cl.main}>
        {{> NavBar}}
        <div class=${cl.content}>
            <h1 class=${cl.title}>500</h1>
            <p class=${cl.subtitle}>Мы уже фиксим</p>
            <a class=${cl.link} href="/chat">Назад к чатам</a>
        </div>
    </main>`
