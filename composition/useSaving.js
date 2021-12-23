import { useNotification } from './useNotification.js'

export const useSaving = () => {
  const $notification = useNotification()

  const state = reactive({
    saving: false,
    fkNotification: 0,
  })

  const saving = computed({
    get () {
      return state.saving
    },
    set (value) {
      if (value === true) {
        const id = $notification.insert({ message: 'Guardando...', type: 'success', duration: false })
        state.fkNotification = id
        state.saving = true
      } else {
        $notification.remove(state.fkNotification)
        $notification.insert({ message: 'Datos guardados con éxito...', type: 'success' })
        state.fkNotification = 0
        state.saving = false
      }
    },
  })

  const handler = (callback) => async (...args) => {
    if (!saving.value) {
      saving.value = true
      await callback(...args)
      saving.value = false
    } else {
      $notification.insert({
        message: 'Se esta guardando un cambio, por favor esperá a que termine para realizar otro',
        type: 'error',
      })
    }
  }

  return handler
}
