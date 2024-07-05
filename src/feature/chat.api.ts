import { HTTPTransport, Methods } from '@/entities/fetch.api.ts'
import { BaseAPI } from '@/entities/base.api.ts'
import { BASE_URL } from '@/shared/lib/constants.ts'

const api = new HTTPTransport()

export class Chat extends BaseAPI {
  private baseURL: string

  constructor() {
    super()
    this.baseURL = BASE_URL
  }

  getChats(): Promise<unknown> {
    return api.request(this.baseURL + 'chats/', {
      method: Methods.GET,
    })
  }

  create(data: { title: string }): Promise<unknown> {
    return api.request(this.baseURL + 'chats/', {
      method: Methods.POST,
      data,
    })
  }
}

export const ChatApi = new Chat()
