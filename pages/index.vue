<template>
  <main class="card">
    <h2 class="text-500 text-center">
      Bienvenido a ar4ecom!
    </h2>
  </main>
</template>

<script>
import { useSesion } from '~/composition/index.js'
export default {
  setup () {
    const $sesion = useSesion()

    onMounted(async () => {
      await $sesion.onlyAuthed()
    })
  },
}
</script>
