<template>
  <main class="card center stack">
    <h2 class="text-500">
      Publicación
    </h2>
    <form id="Form" class="form" @submit.prevent="submit" :disabled="!canWrite">
      <label for="InputPrivado">Privado</label>
      <input id="InputPrivado" v-model="item.privado" type="checkbox" :disabled="!canWrite">

      <label for="InputTitulo">Titulo</label>
      <input id="InputTitulo" v-model="item.titulo" type="text" :disabled="!canWrite">

      <label for="InputDescripcion">Descripcion</label>
      <textarea id="InputDescripcion" v-model="item.descripcion" type="text" :disabled="!canWrite" />

      <label for="InputEtiquetas">Etiquetas</label>
      <input id="InputEtiquetas" v-model="item.etiquetas" type="text" :disabled="!canWrite">

      <label for="InputPrePublicacion">PrePublicacion</label>
      <textarea id="InputPrePublicacion" v-model="item.prePublicacion" type="text" :disabled="!canWrite" />
    </form>
    <nav class="flex justify-end">
      <button class="button" @click="cancel">
        Cancelar
      </button>
      <button form="Form" class="button" :disabled="!canWrite">
        Guardar
      </button>
    </nav>
  </main>
</template>

<script>
import { useResources, useHandler, useSesion } from '~/composition/index.js'
export default {
  setup () {
    // Composables

    const $publicaciones = useResources('/publicaciones')
    const $handle = useHandler()
    const $route = useRoute()
    const $router = useRouter()
    const $sesion = useSesion()

    // Data

    let item = ref({})

    // Computed

    const id = computed(() => {
      return parseInt($route.params.id)
    })

    // Permissions

    const canWrite = computed(() => {
      return id.value === 0 || $sesion.usuario.value?.id === item.value.fkUsuario
    })

    // Actions

    const submit = $handle(async () => {
      if (id.value) {
        await $publicaciones.updateOne(item.value)
      } else {
        await $publicaciones.insertOne(item.value)
      }
      $router.back()
    })

    const cancel = $handle(() => {
      $router.back()
    })

    // Data loading

    const loadItem = $handle(async () => {
      item.value = await $publicaciones.findOne(id.value)
    })

    // Lifecycle hooks

    onMounted(async () => {
      await $sesion.onlyAuthed()
      await loadItem()
    })

    return {
      item,
      canWrite,
      cancel,
      submit,
    }
  },
}
</script>
