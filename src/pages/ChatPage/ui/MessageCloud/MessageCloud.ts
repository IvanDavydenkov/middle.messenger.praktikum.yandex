//language=hbs
import cl from './MessageCloud.module.scss'

export const MessageCloud = `
    {{#if left}}
        <div class=${cl.rightWrapper}>
            <p class=${cl.text}>{{message}}</p>
            <span class=${cl.time}>{{time}}</span>
        </div>
    {{/if}}
    {{#unless}}
        <div class=${cl.leftWrapper}>
            <p class=${cl.text}>{{message}}</p>
            <span class=${cl.time}>{{time}}</span>
        </div>
    {{/unless}}
`