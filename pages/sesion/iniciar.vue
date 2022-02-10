<template>
  <main class="card center stack" size="small">
    <h2 class="text-500 text-center">
      Iniciar Sesión
    </h2>
    <form id="FormLogin" class="form" @submit.prevent="submit">
      <label for="InputEmail">Email</label>
      <input id="InputEmail" v-model="email" type="text">
      <label for="InputContraseña">Contraseña</label>
      <input id="InputContraseña" v-model="contraseña" type="password">
    </form>
    <nav class="flex flex-column align-center">
      <button class="button" form="FormLogin">
        Iniciar Sesión
      </button>
      <nuxt-link class="link" to="/usuario/nuevo">
        Registrarme
      </nuxt-link>
    </nav>
  </main>
</template>

<script>
import { useSesion, useHandler } from '~/composition/index.js'

export default {
  layout: 'session',
  setup () {
    const $sesion = useSesion()
    const $router = useRouter()
    const $handle = useHandler()

    const email = ref('')
    const contraseña = ref('')

    const submit = $handle(async () => {
      await $sesion.login({ email: email.value, contraseña: contraseña.value })
      await $router.push('/')
    })

    return {
      email,
      contraseña,
      submit,
    }
  },
}
</script>
