export const enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export interface Options {
  method?: Methods
  headers?: { [key: string]: string }
  timeout?: number
  data?: unknown
}

export const handleError = (error: string) => {
  console.log(error)
}

export const queryStringify = (data: { [key: string]: string }) => {
  return Object.keys(data as { [key: string]: string })
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')
}

export class HTTPTransport {
  request = (url: string, options: Options, timeout = 5000) => {
    const { method = 'GET', data, headers } = options

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      const fullUrl = method === Methods.GET ? url + queryStringify(data) : url

      xhr.open(method, fullUrl)

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr)
        } else {
          reject(xhr.statusText)
        }
      }

      xhr.timeout = timeout
      xhr.onabort = reject
      xhr.onerror = reject
      xhr.ontimeout = reject

      if (headers) {
        Object.keys(headers).forEach((item) => {
          xhr.setRequestHeader(item, headers[item])
        })
      }

      if (method === Methods.GET || !data) {
        xhr.send()
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json') // Устанавливаем заголовок Content-Type для POST, PUT, DELETE
        xhr.send(JSON.stringify(data)) // Отправляем данные в виде JSON строки
      }
    }).catch(handleError)
  }
}
