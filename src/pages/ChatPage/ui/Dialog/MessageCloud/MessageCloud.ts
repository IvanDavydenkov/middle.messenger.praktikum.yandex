//language=hbs
import cl from './MessageCloud.module.scss'
import { Block } from '@/entities/Block.ts'

export class MessageCloud extends Block {
  constructor(props) {
    super({ ...props })
  }

  render() {
    return `
				<div class='{{className}}'>
						<div class=${cl.wrapper}>
								<p class=${cl.text}>{{message}}</p>
								<span class=${cl.time}>{{time}}</span>
						</div>
				</div>
				`
  }
}
