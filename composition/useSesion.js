import { useRequest } from './useRequest.js'

import { reactive, useRouter } from '#imports'

const state = reactive({
  usuario: null,
  token: null,
})

export const useSesion = () => {
  const $fetch = useRequest()
  const $router = useRouter()

  const refresh = async () => {
    const token = localStorage.getItem('token')

    if (!token) {
      throw new Error('No hay ningun token guardado')
    }

    $fetch.setToken(token)

    const { usuario, accessToken, refreshToken } = await $fetch.patch('/sesion')

    state.usuario = usuario
    state.token = accessToken

    $fetch.setToken(accessToken)

    localStorage.setItem('token', refreshToken)
  }

  const login = async ({ nombre, contraseña }) => {
    const { usuario, accessToken, refreshToken } = await $fetch.post('/sesion', { body: { nombre, contraseña } })

    state.usuario = usuario
    state.token = accessToken

    $fetch.setToken(accessToken)

    localStorage.setItem('token', refreshToken)
  }

  const logout = async () => {
    await $fetch.del('/sesion')

    state.usuario = null
    state.token = null

    $fetch.setToken(false)

    localStorage.removeItem('token')
  }

  const onlyAuthed = async () => {
    try {
      if (!state.token) {
        await refresh()
        $fetch.setRefreshCallback(refresh)
      }
    } catch {
      $router.push('/sesion/iniciar')
    }
  }

  return {
    login,
    logout,
    onlyAuthed,
  }
}
