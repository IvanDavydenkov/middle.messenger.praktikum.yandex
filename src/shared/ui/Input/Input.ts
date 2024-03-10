//language=hbs
import cl from './Input.module.scss'

export const Input = `
    <label class=${cl.label}>
        <span>{{label}}</span>
        <Input class=${cl.input} value="{{value}}" type="{{type}}" name="{{name}}">
    </label>
`
