import * as Pages from './pages'
import { Block } from '@/entities/Block.ts'

const pages: { [key: string]: typeof Block } = {
  chat: Pages.ChatPage,
  signin: Pages.SignInPage,
  signup: Pages.SignUpPage,
  profile: Pages.ProfilePage,
  '404': Pages.NotFoundPage,
  '500': Pages.ServerErrorPage,
}

function navigate(page: string) {
  const currentPage = pages[page]

  if (!currentPage) return

  const container = document.getElementById('app')!

  if (currentPage instanceof Object) {
    const page = new currentPage()
    container.innerHTML = ''

    const source = page.getContent()
    if (!source) return
    container.append(source)
    return
  }
}

document.addEventListener('DOMContentLoaded', () => navigate('profile'))

document.addEventListener('click', (e: Event) => {
  const target = e.target as HTMLLinkElement
  const page = target.getAttribute('page')
  if (page) {
    navigate(page)

    e.preventDefault()
    e.stopImmediatePropagation()
  }
})
