import cl from './styles.module.scss'
import { Block } from '@/entities/Block.ts'

export class FormBody extends Block {
  constructor(props) {
    super({ ...props })
  }

  render() {
    return `
            <form class=${cl.form}>
                <div class=${cl.inputWrapper}>
                
                </div>
                <div class=${cl.btnWrapper}>
                    <a href='/signin'>
                      
                    </a>
                    <a href='/signup'>
                       
                    </a>
                </div>
            </form>
    `
  }
}
