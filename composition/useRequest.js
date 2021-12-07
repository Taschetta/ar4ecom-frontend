import { useRuntimeConfig } from '#app'
import { reactive } from '#imports'

const state = reactive({
  token: null,
  refreshCallback: null,
})

export const useRequest = () => {
  const $config = useRuntimeConfig()

  const base = $config.BACKEND_URL

  const request = async ({ route, query = {}, method, headers = {}, body } = {}) => {
    let url, init

    url = new URL(route, base)

    Object.entries(query).forEach(([field, value]) => {
      url.searchParams.set(field, value)
    })

    init = {}

    init.method = method

    init.headers = {
      'Authorization': state.token && `Bearer ${state.token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...headers,
    }

    if (body) {
      init.body = JSON.stringify(body)
    }

    let result, data

    result = await fetch(url, init)
    data = await result.json()

    if (!result.ok && result.status === 401 && !!state.refreshCallback) {
      await state.refreshCallback()
      init.headers.Authorization = state.token && `Bearer ${state.token}`
      result = await fetch(url, init)
      data = await result.json()
    }

    if (!result.ok) {
      throw new RequestError({ status: result.status, message: data.message })
    }

    return data
  }

  return {
    get: (route, { body, query } = {}) => {
      return request({ route, method: 'GET', body, query })
    },
    post: (route, { body, query } = {}) => {
      return request({ route, method: 'POST', body, query })
    },
    put: (route, { body, query } = {}) => {
      return request({ route, method: 'PUT', body, query })
    },
    patch: (route, { body, query } = {}) => {
      return request({ route, method: 'PATCH', body, query })
    },
    del: (route, { body, query } = {}) => {
      return request({ route, method: 'DELETE', body, query })
    },

    setToken: (token) => {
      state.token = token
    },

    setRefreshCallback: (callback) => {
      state.refreshCallback = callback
    },
  }
}

class RequestError extends Error {
  constructor ({ status, message }) {
    super(`${message} (${status})`)
    this.name = 'RequestError'
    this.status = status
    this.message = message
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequestError)
    }
  }
}
