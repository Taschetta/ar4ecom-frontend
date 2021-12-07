<template>
  <main>
    <h2>Bienvenido a ar4ecom!</h2>
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
