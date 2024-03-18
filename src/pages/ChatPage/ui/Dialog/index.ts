import Handlebars from 'handlebars'
// import './chat-page.scss';

export { Dialog } from './Dialog.ts'

Handlebars.registerHelper('chat-data', () => {
  return [
    { message: 'Изображение', time: Date.now() },
    { message: 'Go на свалку!', time: Date.now() },
    { message: 'А у кого ключи от сарая?', time: Date.now() },
  ]
})
