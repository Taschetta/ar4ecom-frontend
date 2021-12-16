<template>
  <main class="card center stack">
    <h2 class="text-500">
      Mis datos
    </h2>
    <form id="Form" class="form" @submit.prevent="submit">
      <label for="InputNombre">Nombre</label>
      <input id="InputNombre" v-model="item.nombre" type="text">
      <label for="InputEmail">Email</label>
      <input id="InputEmail" v-model="item.email" type="email">
      <label for="InputContraseña">Contraseña</label>
      <input id="InputContraseña" v-model="item.contraseña" type="password">
    </form>
    <nav class="flex justify-end">
      <button class="button" form="Form">
        Volver
      </button>
      <button class="button" form="Form">
        Guardar
      </button>
    </nav>
  </main>
</template>

<script>
import { useResource, useHandler, useSesion } from '~/composition/index.js'
export default {
  setup () {
    const $resource = useResource('/usuario')
    const $handle = useHandler()
    const $router = useRouter()
    const $sesion = useSesion()

    let item = ref({
      nombre: '',
      email: '',
      contraseña: '',
    })

    const submit = $handle(async () => {
      await $resource.update(item.value)
      $router.back()
    })

    onMounted(async () => {
      await $sesion.onlyAuthed()
      item.value = await $resource.find()
    })

    return {
      item,
      submit,
    }
  },
}
</script>
