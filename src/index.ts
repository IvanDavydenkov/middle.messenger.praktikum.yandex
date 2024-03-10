import Handlebars from 'handlebars'
import * as Components from './shared/ui'
import * as Pages from './pages'

export interface Page {
  [key: string]: string[]
}

const pages: Page = {
  chat: [Pages.ChatPage],
  signin: [Pages.SignInPage],
  signup: [Pages.SignUpPage],
  profile: [Pages.ProfilePage],
  '404': [Pages.NotFoundPage],
  '500': [Pages.ServerErrorPage],
}

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component)
})

function navigate(page: string) {
  const [source, args] = pages[page]
  const handlebarsFunc = Handlebars.compile(source)
  document.body.innerHTML = handlebarsFunc(args)
}

document.addEventListener('click', (e: Event) => {
  const page = (e.target as HTMLElement).getAttribute('page')
  if (page) {
    navigate(page)

    e.preventDefault()
    e.stopImmediatePropagation()
  }
})

document.addEventListener('DOMContentLoaded', () => navigate('signin'))
