import Handlebars from 'handlebars';
import * as Components from './shared/ui';
import * as Pages from './pages';

const pages = {
	'chat': Pages.ChatPage,
	'signin': Pages.SignInPage,
	'signup': Pages.SignUpPage
};

Object.entries(Components).forEach(([name, component]) => {
	Handlebars.registerPartial(name, component);
});

document.addEventListener('DOMContentLoaded', () => {
	const root = document.querySelector('#app')
	const template = Handlebars.compile(Pages.ChatPage)

	const result = template({
		avatar: 'https://ferrethome.ru/wp-content/uploads/d/0/a/d0a2d89db02f9d50106048dfeffade72.jpeg',
		name: 'Ivan',
		time: '19:40',
		unread: 2,
		message: 'Hello Ivan!'
	})

	root!.innerHTML = result
})


