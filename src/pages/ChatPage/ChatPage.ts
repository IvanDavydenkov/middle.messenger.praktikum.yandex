//language=hbs
import cl from './styles.module.scss'
import { HeaderSlideBar } from './ui/HeaderSlideBar/HeaderSlideBar.ts'
import { ChatList } from './ui/ChatList/ChatList.ts'
import { ChatPreview } from './ui/ChatPreview/ChatPreview.ts'
import { Dialog } from '@/pages/ChatPage/ui/Dialog'
import { NavBar } from '@/shared/NavBar'
import { Block } from '@/entities/Block.ts'

export class ChatPage extends Block {
  constructor(props) {
    super({
      ...props,
      NavBar: new NavBar({}),
      HeaderSlideBar: new HeaderSlideBar({}),
      ChatList: new ChatList({}), // TODO: tut problema
      ChatPreview: new ChatPreview({}), // TODO: tut problema
      Dialog: new Dialog({}),
    })
  }

  render() {
    return `
    <main class=${cl.main}>
			{{{ NavBar }}}
			<div class=${cl.sidebar}>
				 {{{ HeaderSlideBar}}}
					{{#> ChatList className="chat-page__list"}}
							{{#each (chat-page-list)}}
									{{{ ChatPreview}}}
							{{/each}}
					{{/ChatList}}
			</div>
			{{{Dialog}}}
		</main>
    `
  }
}
