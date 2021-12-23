<template>
  <main class="card">
    <h2 class="text-500 text-center">
      Registrarme
    </h2>
    <form id="Form" class="form" @submit.prevent="submit">
      <label for="InputNombre">Nombre</label>
      <input id="InputNombre" v-model="item.nombre" type="text">
      <label for="InputEmail">Email</label>
      <input id="InputEmail" v-model="item.email" type="email">
      <label for="InputContraseña">Contraseña</label>
      <input id="InputContraseña" v-model="item.contraseña" type="password">
    </form>
    <nav class="flex justify-center">
      <button class="button" form="Form">
        Iniciar Sesión
      </button>
    </nav>
  </main>
</template>

<script>
import { useResource, useHandler, useSaving } from '~/composition/index.js'

export default {
  setup () {
    const $resource = useResource('/usuario')
    const $handle = useHandler()
    const $router = useRouter()
    const $saving = useSaving()

    const item = reactive({
      nombre: '',
      email: '',
      contraseña: '',
    })

    const submit = $handle($saving(async () => {
      await $resource.insert(item)
      $router.push('/sesion/iniciar')
    }))

    return {
      item,
      submit,
    }
  },
}
</script>

<style>

</style>
