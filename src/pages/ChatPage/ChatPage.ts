//language=hbs
import cl from './styles.module.scss'
import {HeaderSlideBar} from "./ui/HeaderSlideBar/HeaderSlideBar.ts";
import {Dialog} from './ui/Dialog/Dialog.ts'

export const ChatPage = `
    <main class=${cl.main}>
        <div class=${cl.sidebar}>
            ${HeaderSlideBar}
            {{#> ChatList className="chat-page__list"}}
                {{#each (chat-page-list)}}
                    {{> ChatPreview}}
                {{/each}}
            {{/ChatList}}
        </div>
				${Dialog}
    </main>`