export interface LoginProps {
  login: string
  password: string
}

export interface RegisterProps {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export interface AuthResponseProps {
  id: number
}
