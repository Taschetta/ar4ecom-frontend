import { useNotification } from './useNotification.js'

export const useHandler = () => {
  const $notification = useNotification()

  const handle = callback => async (args) => {
    try {
      return await callback(args)
    } catch (error) {
      $notification.insert({ message: error.message })
    }
  }

  return {
    handle,
  }
}
