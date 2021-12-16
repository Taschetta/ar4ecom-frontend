<template>
  <main class="card center stack">
    <h2 class="text-500">
      {{ item.titulo }}
    </h2>
  </main>
</template>

<script>
import { useSesion, useResources, useHandler } from '~/composition/index.js'
export default {
  setup () {

    // Composables

    const $resources = useResources('/publicaciones')
    const $handle = useHandler()
    const $sesion = useSesion()
    const $route = useRoute()

    // Data: Static

    const id = parseInt($route.params.id)

    // Data: Reactive

    const item = ref({})

    // Data: Loading

    const loadItem = $handle(async () => {
      item.value = await $resources.findOne(id)
    })

    // Lifecycle

    onMounted(async () => {
      await $sesion.onlyAuthed()
      await loadItem()
    })

    return {
      item,
    }
  },
}
</script>
