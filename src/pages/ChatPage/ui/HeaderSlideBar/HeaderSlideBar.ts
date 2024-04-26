import cl from './HeaderSlideBar.module.scss'
import { ArrowIcon } from '../../assets/ArrowIcon.ts'
import { Block } from '@/entities/Block.ts'

export class HeaderSlideBar extends Block {
  constructor(props: Record<string | symbol, unknown>) {
    super(props)
  }

  render() {
    return `
				 <header class=${cl.header}>
						<a class=${cl.link} href="/profile">Профиль${ArrowIcon}</a>
						<input class=${cl.input} placeholder='Поиск'/>
			   </header>
		`
  }
}
