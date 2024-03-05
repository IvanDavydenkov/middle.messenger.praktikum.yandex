import Handlebars from 'handlebars';
import './styles.module.scss';

export {ChatPage} from './ChatPage.ts';

Handlebars.registerHelper('chat-page-list', () => {
	return [
		{
			name: 'Опоссум',
			message: 'Изображение',
			unread: '2',
			avatar: "https://ferrethome.ru/wp-content/uploads/d/0/a/d0a2d89db02f9d50106048dfeffade72.jpeg"
		},
		{name: 'Енот', message: 'Go на свалку!'},
		{name: 'Барсук', message: 'А у кого ключи от сарая?', unread: '4'},
	]
});
