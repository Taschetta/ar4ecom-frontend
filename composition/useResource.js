import { useRequest } from './useRequest.js'

export const useResource = (route) => {
  const { get, post, patch, del } = useRequest()

  return {
    find: () => {
      return get(route)
    },
    insert: (item = {}) => {
      return post(route, { body: item })
    },
    update: (item = {}) => {
      return patch(route, { body: item })
    },
    remove: () => {
      return del(route)
    },
  }
}
