import { useRequest } from './useRequest.js'

export const useResource = (route) => {
  const { get, post, put, patch, del } = useRequest()

  return {
    findMany: (query) => {
      return get(route, { query })
    },
    findOne: (id) => {
      return get(`${route}/${id}`)
    },
    insertMany: (items = []) => {
      return post(route, { body: items })
    },
    insertOne: (item = {}) => {
      return post(route, { body: item })
    },
    updateMany: (query = {}, update = {}) => {
      return patch(route, { body: update, query })
    },
    updateOne: (query = {}, update = {}) => {
      return patch(route, { body: update, query })
    },
    upsertMany: (items = []) => {
      return put(route, { body: items })
    },
    upsertOne: ({ id, ...item } = {}) => {
      return put(`${route}/${id}`, { body: item })
    },
    removeMany: (query = {}) => {
      return del(route, { query })
    },
    removeOne: ({ id, ...query } = {}) => {
      return del(`${route}/${id}`, { query })
    },
  }
}
