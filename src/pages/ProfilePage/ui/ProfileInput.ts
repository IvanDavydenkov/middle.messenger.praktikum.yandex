//language=hbs
import cl from './ProfileInput.module.scss'

export const ProfileInput = `
    <label class=${cl.label}>
        <span>{{label}}</span>
        <Input class=${cl.input} value="{{value}}" type="{{type}}" name="{{name}}">
    </label>
`