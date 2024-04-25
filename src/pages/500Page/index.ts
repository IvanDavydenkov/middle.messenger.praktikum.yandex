import cl from './styles.module.scss'
import { Block } from '@/entities/Block.ts'
import { NavBar } from '@/shared/NavBar'

export class ServerErrorPage extends Block {
  constructor(props) {
    super({
      ...props,
      NavBar: new NavBar({}),
    })
  }

  render() {
    return `
        <main class=${cl.main}>
            {{{ NavBar }}}
            <div class=${cl.content}>
                <h1 class=${cl.title}>500</h1>
                <p class=${cl.subtitle}>Мы уже фиксим</p>
                <a class=${cl.link} href="/chat">Назад к чатам</a>
            </div>
        </main>
         `
  }
}
