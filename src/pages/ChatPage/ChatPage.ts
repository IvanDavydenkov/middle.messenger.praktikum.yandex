//language=hbs
import cl from './styles.module.scss'
import { HeaderSlideBar } from './ui/HeaderSlideBar/HeaderSlideBar.ts'

import { NavBar } from '@/shared/NavBar'
import { Block } from '@/entities/Block.ts'
import { ChatPreview } from '@/pages/ChatPage/ui/ChatPreview/ChatPreview.ts'
import { Dialog } from '@/pages/ChatPage/ui/Dialog/Dialog.ts'
import { ChatApi } from '@/feature/chat.api.ts'

export class ChatPage extends Block {
  constructor(props: Record<string | symbol, unknown>) {
    super({
      ...props,
      NavBar: new NavBar({}),
      HeaderSlideBar: new HeaderSlideBar({}),
      ChatPreview: new ChatPreview({
        data: ['123'],
      }),
      Dialog: new Dialog({
        ...props,
        avatar: '',
        messages: [],
      }),
    })
  }

  getChats() {
    return ChatApi.getChats()
  }

  init() {
    super.init()
    const onChatClick = this.onChatClick
    this.getChats().then((chats) => {
      return this.children.ChatPreview.setProps({
        data: JSON.parse(chats.response).map((item) => ({
          ...item,
          onClick: onChatClick,
        })),
      })
    })
  }

  onChatClick(id) {
    console.log(id)
  }

  render() {
    return `
    <main class=${cl.main}>
			{{{ NavBar }}}
			<div class=${cl.sidebar}>
				 {{{ HeaderSlideBar}}}
				 <div>
         {{{ChatPreview}}}
        </div>
			</div>
			{{{Dialog}}}
		</main>
    `
  }
}
