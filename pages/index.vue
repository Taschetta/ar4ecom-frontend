<template>
  <main class="stack stack-500">
    <h2 class="card text-500 text-center">
      Bienvenido a ar4ecom!
    </h2>
    <article class="card">
      <h3 class="text-500">
        Mis datos
      </h3>
      <nav>
        <nuxt-link to="/usuario">
          Editar
        </nuxt-link>
      </nav>
    </article>
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
