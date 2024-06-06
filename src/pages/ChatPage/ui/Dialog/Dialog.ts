//language=hbs
import cl from './Dialog.module.scss'
import { MenuIcon } from '../../assets/MenuIcon.ts'
import { ArrowSendMessage } from '@/shared/icons/ArrowSendMessage.ts'
import { AttachIcon } from '../../assets/AttachIcon.ts'
import { Block } from '@/entities/Block.ts'

export class Dialog extends Block {
  constructor(props: Record<string | symbol, unknown>) {
    super({
      ...props,
    })
  }

  render() {
    return `
        <div class=${cl.section}>
        <div class=${cl.header}>
            <div class=${cl.wrapper}>
                <img class=${cl.img} src='{{avatar}}' alt="avatar"/>
                <h4 class=${cl.name}>{{name}}</h4>
            </div>
            <button class=${cl.btn}>${MenuIcon}</button>
        </div>
        <div class=${cl.body}>
 			   {{#each messages}}
              <div class='{{className}}'>
                  <div class=${cl.wrapper}>
                    <p class=${cl.text}>{{message}}</p>
                    <span class=${cl.time}>{{time}}</span>
                  </div>
              </div>
 			   {{/each}}
        </div>
        <div class=${cl.footer}>
						<button class=${cl.btn}>${AttachIcon}</button>
						<input class=${cl.input} placeholder="Сообщение" />
						<button class=${cl.btn}>${ArrowSendMessage}</button>
        </div>

    </div>
    `
  }
}
