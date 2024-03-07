//language=hbs
import cl from './styles.module.scss'
import {ProfileInput} from './ui/ProfileInput.ts'
import Handlebars from "handlebars";
import {ArrowSendMessage} from '@/shared/icons/ArrowSendMessage.ts'

Handlebars.registerPartial('ProfileInput', ProfileInput)
Handlebars.registerPartial('ArrowSendMessage', ArrowSendMessage)
export const ProfilePage = `
    <section class=${cl.section}>
        <div class=${cl.sidebar}>{{>ArrowSendMessage}}</div>
        <div class=${cl.container}>
         <form class=${cl.form}>
            <img class=${cl.img} src="{{avatar}}"/>
            <div class=${cl.inputWrapper}>
            {{>ProfileInput label='Имя' name='first_name' value='lorem' type="text"}}
            {{>ProfileInput label='Фамилия' name='second_name' value='lorem' type="text"}}
            {{>ProfileInput label='Никнейм' name='display_name' value='lorem' type="text"}}
            {{>ProfileInput label='Логин' name='login' value='lorem' type="text"}}
            {{>ProfileInput label='Почта' name='email' value='lorem@lorem' type="email"}}
            {{>ProfileInput label='Телефон' name='phone' value='9772691478' type="text"}}
            {{>ProfileInput label='Старый пароль' name='oldPassword' value='lorem' type="password"}}
            {{>ProfileInput label='Новый пароль' name='newPassword' value='lorem' type="password"}}
          
            </div>
            {{>Button label='Сохранить'}}
        </form>
        </div>
       
    </section>`