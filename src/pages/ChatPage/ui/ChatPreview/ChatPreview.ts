//language=hbs
import cl from './ChatPreview.module.scss'


export const ChatPreview = `
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
`