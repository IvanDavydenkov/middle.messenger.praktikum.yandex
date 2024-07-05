import cl from './HeaderSlideBar.module.scss'
import { ArrowIcon } from '../../assets/ArrowIcon.ts'
import { Block } from '@/entities/Block.ts'
import { Button } from '@/shared/ui'
import { ChatApi } from '@/feature/chat.api.ts'

export class HeaderSlideBar extends Block {
  constructor(props: Record<string | symbol, unknown>) {
    super({ ...props })
  }

  init() {
    const onAdd = this.onAdd.bind(this)
    const onCreate = this.onCreate.bind(this)
    const AddChatButton = new Button({
      label: 'Добавить чат',
      onClick: onAdd,
    })
    const CreateChatButton = new Button({
      label: 'Создать чат',
      onClick: onCreate,
    })
    this.children = {
      ...this.children,
      AddChatButton,
      CreateChatButton,
    }
  }

  onAdd() {
    const test = prompt('Введите id чата')
  }

  onCreate() {
    const test = prompt('Введите название чата')
    ChatApi.create({ title: test as string })
  }

  render() {
    return `
				 <header class=${cl.header}>
						<a class=${cl.link} href="/profile">Профиль${ArrowIcon}</a>
						<input class=${cl.input} placeholder='Поиск'/>
						{{{ AddChatButton }}}
						{{{ CreateChatButton }}}
			   </header>
		`
  }
}
