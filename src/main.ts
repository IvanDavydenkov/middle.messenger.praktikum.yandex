import * as Pages from './pages'
import { Block } from '@/entities/Block.ts'
import { Router } from '@/entities/Router.ts'

const pages: { [key: string]: typeof Block } = {
  chat: Pages.ChatPage,
  signin: Pages.SignInPage,
  signup: Pages.SignUpPage,
  profile: Pages.ProfilePage,
  '404': Pages.NotFoundPage,
  '500': Pages.ServerErrorPage,
}

// function navigate(page: string) {
//   const CurrentPage = pages[page]
//
//   if (!CurrentPage) return
//
//   const container = document.getElementById('app')
//   if (!container) return
//
//   const pageInstance = new CurrentPage()
//   container.innerHTML = ''
//
//   const source = pageInstance.getContent()
//   if (!source) return
//   container.append(source)
// }

const router = new Router('#app')
router.use('/', Pages.ChatPage)
router.use('/signin', Pages.SignInPage)
router.use('/signup', Pages.SignUpPage)
router.use('/profile', Pages.ProfilePage)
router.use('/404', Pages.NotFoundPage)
router.use('/500', Pages.ServerErrorPage)

// Не забывайте вызвать start у роутера
router.start()

// AuthApi.create({ login: 'myoato', password: 'Qwerty1337' })
// AuthApi.register({
//   first_name: 'Ivan',
//   second_name: 'Davydenkov',
//   login: 'moyato',
//   email: 'moyato@test.test',
//   password: 'Qwerty1337',
//   phone: '89772691472',
// })


