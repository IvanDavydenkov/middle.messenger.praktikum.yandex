import cl from './NavBar.module.scss'
import { Block } from '@/entities/Block.ts'

export class NavBar extends Block {
  constructor(props: { [key: string]: unknown }) {
    super({
      ...props,
    })
  }

  render() {
    return `
              <nav class=${cl.nav}>
                  <ul>
                      <li><a href="/" page="chat">Chat</a></li>
                      <li><a href="/" page="signin">signin</a></li>
                      <li><a href="/" page="signup">signup</a></li>
                      <li><a href="/" page="profile">profile</a></li>
                      <li><a href="/" page="404">404</a></li>
                      <li><a href="/" page="500">500</a></li>
                  </ul>
              </nav>
    `
  }
}
