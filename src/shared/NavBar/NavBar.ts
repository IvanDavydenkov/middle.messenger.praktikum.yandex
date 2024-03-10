//language=hbs
import cl from './NavBar.module.scss'

export const NavBar = `
    <nav class=${cl.nav}>
        <ul>
            <li><a href="/" page="chat">Chat</a></li>
            <li><a href="/" page="signin">signin</a></li>
            <li><a href="/" page="signup">signup</a></li>
            <li><a href="/" page="profile">profile</a></li>
            <li><a href="/" page="404">404</a></li>
            <li><a href="/" page="500">500</a></li>
        </ul>
    </nav>

`
// chat: [Pages.ChatPage],
//   signin: [Pages.SignInPage],
//   signup: [Pages.SignUpPage],
//   profile: [Pages.ProfilePage],
//   '404': [Pages.NotFoundPage],
//   '500': [Pages.ServerErrorPage],