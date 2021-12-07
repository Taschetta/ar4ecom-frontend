<template>
  <main>
    <h2>Iniciar Sesión</h2>
    <form id="FormLogin" @submit.prevent="login">
      <label for="InputNombre">Nombre</label>
      <input id="InputNombre" v-model="nombre" type="text">
      <label for="InputContraseña">Contraseña</label>
      <input id="InputContraseña" v-model="contraseña" type="password">
    </form>
    <nav>
      <button form="FormLogin">
        Iniciar Sesión
      </button>
    </nav>
  </main>
</template>

<script>
import { useSesion, useHandler } from '~/composition/index.js'

export default {
  setup () {
    const { handle } = useHandler()

    const $sesion = useSesion()
    const $router = useRouter()

    const nombre = ref('')
    const contraseña = ref('')

    const login = handle(async () => {
      await $sesion.login({ nombre: nombre.value, contraseña: contraseña.value })
      await $router.push('/')
    })

    return {
      nombre,
      contraseña,
      login,
    }
  },
}
</script>

<style>

</style>
