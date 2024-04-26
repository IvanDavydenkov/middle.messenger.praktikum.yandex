//language=hbs
import cl from './ChatPreview.module.scss'
import { Block } from '@/entities/Block.ts'

export class ChatPreview extends Block {
  constructor(props: Record<string | symbol, unknown>) {
    super({ ...props })
  }

  render() {
    return `

 	<ul class=${cl.list}>
      {{#each data}}
       <div class=${cl.chat}>
        {{#if avatar}}
            <img class=${cl.img} src="{{avatar}}"/>
        {{/if}}
        {{#unless avatar}}
            <div class=${cl.noavatar}></div>
        {{/unless}}
        <div class=${cl.chatInfo}>
            <h4 class=${cl.title}>{{name}}</h4>
            <p class=${cl.message}>{{message}}</p>
            <span class=${cl.time}>{{time}}</span>
            {{#if unread}}
                <span class=${cl.notification}>{{unread}}</span>
            {{/if}}
        </div>
      </div>
       {{/each}}
    </ul>

`
  }
}
