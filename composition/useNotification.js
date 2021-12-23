import { reactive, computed } from '#imports'

const state = reactive({
  items: [],
  duration: 2500,
})

export const useNotification = () => {
  const items = computed(() => {
    return state.items
  })

  const last = computed(() => {
    if (state.items.length) {
      return state.items[state.items.length - 1]
    }
    return null
  })

  const findIndex = (id) => {
    return state.items.findIndex(item => item.id === id)
  }

  const insert = ({ message, type, duration = state.duration } = {}) => {
    const id = last.value?.id + 1 || 1

    state.items.push({ id, message, type })

    // if a duration is set or is the default value set a timeout to remove it
    // if duration is set to a falsy value, dont remove it
    if (duration) {
      setTimeout(() => remove(id), duration)
    }

    return id
  }

  const remove = (id) => {
    const index = findIndex(id)
    if (index !== -1) {
      state.items.splice(index, 1)
    }
  }

  return {
    items,
    last,
    insert,
    remove,
  }
}
