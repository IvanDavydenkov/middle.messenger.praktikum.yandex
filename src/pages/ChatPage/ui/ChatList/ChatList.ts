//language=hbs
import cl from './ChatList.module.scss'
import { Block } from '@/entities/Block.ts'

export class ChatList extends Block {
  constructor(props) {
    super(props)
  }

  render() {
    return `
  	<ul class=${cl.list}>
        {{>@partial-block }}
    </ul>
  `
  }
}
