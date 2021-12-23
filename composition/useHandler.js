/* eslint-disable node/no-callback-literal */
import { useNotification } from './useNotification.js'

export const useHandler = () => {
  const $notification = useNotification()
  const $router = useRouter()

  return callback => async (...args) => {
    try {
      return await callback(...args)
    } catch (error) {
      if (error.name === 'RequestError' && error.status === 401) {
        $notification.insert({ message: 'Se terminó su seción. Por favor, vuelva a loguearse', type: 'error' })
        $router.push('/sesion/iniciar')
      } else {
        $notification.insert({ message: error.message, type: 'error' })
      }
    }
  }
}
