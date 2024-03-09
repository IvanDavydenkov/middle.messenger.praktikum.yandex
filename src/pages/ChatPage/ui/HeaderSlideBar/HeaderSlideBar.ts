//language=hbs
import cl from './HeaderSlideBar.module.scss'
// import {SearchIcon} from '../assets/SearchIcon.ts'
import {ArrowIcon} from '../../assets/ArrowIcon.ts'

export const HeaderSlideBar = `
    <header class=${cl.header}>
        <a class=${cl.link} href="/profile">Профиль${ArrowIcon}</a>
        <input class=${cl.input} placeholder='Поиск'/>
    </header>`