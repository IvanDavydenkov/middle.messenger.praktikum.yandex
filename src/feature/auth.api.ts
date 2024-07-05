import { BaseAPI } from '@/entities/base.api.ts'
import { HTTPTransport, Methods } from '@/entities/fetch.api.ts'
import { BASE_URL } from '@/shared/lib/constants.ts'
import { LoginProps, RegisterProps } from '@/feature/types.ts'

const api = new HTTPTransport()

export class Auth extends BaseAPI {
  private baseURL: string

  constructor() {
    super()
    this.baseURL = BASE_URL
  }

  login(data: LoginProps): Promise<unknown> {
    return api.request(this.baseURL + 'auth/signin', {
      method: Methods.POST,
      data: data,
    })
  }

  register(data: RegisterProps): Promise<unknown> {
    return api.request(this.baseURL + 'auth/signup', {
      method: Methods.POST,
      data: data,
    })
  }
}

export const AuthApi = new Auth()
