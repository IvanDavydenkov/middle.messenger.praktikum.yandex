//language=hbs
import cl from './styles.module.scss'
import Handlebars from 'handlebars'
import { HeaderSlideBar } from './ui/HeaderSlideBar/HeaderSlideBar.ts'
import { ChatList } from './ui/ChatList/ChatList.ts'
import { ChatPreview } from './ui/ChatPreview/ChatPreview.ts'
import { Dialog } from '@/pages/ChatPage/ui/Dialog'
import { NavBar } from '@/shared/NavBar/NavBar.ts'

Handlebars.registerPartial('NavBar', NavBar)
Handlebars.registerPartial('ChatList', ChatList)
Handlebars.registerPartial('ChatPreview', ChatPreview)
Handlebars.registerPartial('HeaderSlideBar', HeaderSlideBar)
Handlebars.registerPartial('Dialog', Dialog)

export const ChatPage = `
<main class=${cl.main}>
{{> NavBar}}
    <div class=${cl.sidebar}>
       {{> HeaderSlideBar}}
        {{#> ChatList className="chat-page__list"}}
            {{#each (chat-page-list)}}
                {{> ChatPreview}}
            {{/each}}
        {{/ChatList}}
    </div>
		{{>Dialog}}
</main>
`
