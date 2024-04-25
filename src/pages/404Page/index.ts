import cl from './styles.module.scss'
import { Block } from '@/entities/Block.ts'
import { NavBar } from '@/shared/NavBar'

export class NotFoundPage extends Block {
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
                  <h1 class=${cl.title}>404</h1>
                  <p class=${cl.subtitle}>Не туда попали</p>
                  <a class=${cl.link} href="/chat">Назад к чатам</a>
              </div>
          </main>
      `
  }
}
