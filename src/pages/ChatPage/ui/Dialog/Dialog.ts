//language=hbs
import cl from './Dialog.module.scss'
import Handlebars from 'handlebars'
import { MenuIcon } from '../../assets/MenuIcon.ts'
import { ArrowSendMessage } from '@/shared/icons/ArrowSendMessage.ts'
import { AttachIcon } from '../../assets/AttachIcon.ts'
import { MessageCloud } from './MessageCloud/MessageCloud.ts'

Handlebars.registerPartial('MessageCloud', MessageCloud)
export const Dialog = `
    <div class=${cl.section}>
        <div class=${cl.header}>
            <div class=${cl.wrapper}>
                <img class=${cl.img} src='{{avatar}}' alt="avatar"/>
                <h4 class=${cl.name}>{{name}}</h4>
            </div>
            <button class=${cl.btn}>${MenuIcon}</button>
        </div>
        <div class=${cl.body}>
 						{{#each (chat-data)}}
                {{> MessageCloud }}
            {{/each}}
    
        </div>
        <div class=${cl.footer}>

						<button class=${cl.btn}>${AttachIcon}</button>
						<input class=${cl.input} placeholder="Сообщение" />
						<button class=${cl.btn}>${ArrowSendMessage}</button>

        </div>

    </div>
`
