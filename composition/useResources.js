import { useRequest } from './useRequest.js'

export const useResources = (route) => {
  const { get, post, patch, del } = useRequest()

  return {
    findMany: (query) => {
      return get(route, { query })
    },
    findOne: (id) => {
      return get(`${route}/${id}`)
    },
    insertOne: (item = {}) => {
      return post(route, { body: item })
    },
    updateOne: (id, update = {}) => {
      return patch(`${route}/${id}`, { body: update })
    },
    removeOne: ({ id, ...query } = {}) => {
      return del(`${route}/${id}`, { query })
    },
  }
}
