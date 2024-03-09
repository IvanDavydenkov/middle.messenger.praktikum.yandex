import Handlebars from 'handlebars'
import * as Components from './shared/ui'
import * as Pages from './pages'

type Pages = Record<string, string>
const pages: Pages = {
  chat: Pages.ChatPage,
  signin: Pages.SignInPage,
  signup: Pages.SignUpPage,
  profile: Pages.ProfilePage,
  '404': Pages.NotFoundPage,
  '500': Pages.ServerErrorPage,
}

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component)
})

const currentPage = (pages: Pages) => {
  const url = window.location
  const currentPath = url.pathname.slice(1)
  console.log('Current path:', currentPath) // Отладочное сообщение
  if (pages[currentPath]) {
    return pages[currentPath]
  }
  console.log('Page not found') // Отладочное сообщение
  return pages['404']
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app')
  const template = Handlebars.compile(currentPage(pages))

  const result = template({
    avatar:
      'https://ferrethome.ru/wp-content/uploads/d/0/a/d0a2d89db02f9d50106048dfeffade72.jpeg',
    name: 'Ivan',
    time: '19:40',
    unread: 2,
    message: 'Hello Ivan!',
  })

  root!.innerHTML = result
})
