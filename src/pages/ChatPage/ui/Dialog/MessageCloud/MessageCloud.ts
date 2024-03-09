//language=hbs
import cl from './MessageCloud.module.scss'


export const MessageCloud = `
    <div class='{{className}}'>
        <div class=${cl.wrapper}>
            <p class=${cl.text}>{{message}}</p>
            <span class=${cl.time}>{{time}}</span>
        </div>
    </div>
`

