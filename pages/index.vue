<template>
  <main class="stack stack-400">
    <h2 class="card text-500 text-center">
      Bienvenido a ar4ecom!
    </h2>
    <article class="card stack stack-200">
      <h3 class="text-400">
        Mis datos
      </h3>
      <nav>
        <nuxt-link to="/usuario">
          Editar
        </nuxt-link>
      </nav>
    </article>
    <button class="button button-error full-width">
      Cerrar Sesion
    </button>
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
