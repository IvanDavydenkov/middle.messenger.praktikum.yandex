//language=hbs
import cl from './styles.module.scss'
import { HeaderSlideBar } from './ui/HeaderSlideBar/HeaderSlideBar.ts'

import { NavBar } from '@/shared/NavBar'
import { Block } from '@/entities/Block.ts'
import { ChatPreview } from '@/pages/ChatPage/ui/ChatPreview/ChatPreview.ts'
import { Dialog } from '@/pages/ChatPage/ui/Dialog/Dialog.ts'

export class ChatPage extends Block {
  constructor(props: Record<string | symbol, unknown>) {
    super({
      ...props,
      NavBar: new NavBar({}),
      HeaderSlideBar: new HeaderSlideBar({}),
      ChatPreview: new ChatPreview({
        data: [
          {
            name: 'Опоссум',
            message: 'Изображение',
            unread: '2',
            avatar:
              'https://ferrethome.ru/wp-content/uploads/d/0/a/d0a2d89db02f9d50106048dfeffade72.jpeg',
          },
          { name: 'Енот', message: 'Go на свалку!' },
          { name: 'Барсук', message: 'А у кого ключи от сарая?', unread: '4' },
        ],
      }),
      Dialog: new Dialog({
        ...props,
        avatar:
          'https://ferrethome.ru/wp-content/uploads/d/0/a/d0a2d89db02f9d50106048dfeffade72.jpeg',
        messages: [
          {
            className: '123',
            message: '123123131231',
            time: '12-00',
          },
          {
            className: '123',
            message: '123123131231',
            time: '12-00',
          },
          {
            className: '123',
            message: '123123131231',
            time: '12-00',
          },
          {
            className: '123',
            message: '123123131231',
            time: '12-00',
          },
          {
            className: '123',
            message: '123123131231',
            time: '12-00',
          },
          {
            className: '123',
            message: '123123131231',
            time: '12-00',
          },
        ],
      }),
    })
  }

  render() {
    return `
    <main class=${cl.main}>
			{{{ NavBar }}}
			<div class=${cl.sidebar}>
				 {{{ HeaderSlideBar}}}
         {{{ChatPreview}}}
			</div>
			{{{Dialog}}}
		</main>
    `
  }
}
