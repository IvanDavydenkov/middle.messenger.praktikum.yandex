import Handlebars from 'handlebars'
import * as Pages from './pages'

const pages: { [key: string]: any } = {
  chat: [Pages.ChatPage],
  signin: [Pages.SignInPage],
  signup: [Pages.SignUpPage],
  profile: [Pages.ProfilePage],
  '404': [Pages.NotFoundPage],
  '500': [Pages.ServerErrorPage],
}

function navigate(page: string) {
  const [source, context] = pages[page]
  const container = document.getElementById('app')!

  if (source instanceof Object) {
    const page = new source(context)
    container.innerHTML = ''
    container.append(page.getContent())
    return
  }

  container.innerHTML = Handlebars.compile(source)(context)
}

document.addEventListener('DOMContentLoaded', () => navigate('chat'))

document.addEventListener('click', (e) => {
  const target = e.target as HTMLLinkElement
  const page = target.getAttribute('page')
  if (page) {
    navigate(page)

    e.preventDefault()
    e.stopImmediatePropagation()
  }
})
