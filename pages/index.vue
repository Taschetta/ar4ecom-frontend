<template>
  <main class="card stack stack-500">
    <h2 class="text-500 text-center">
      Bienvenido a ar4ecom!
    </h2>
    <article class="stack stack-200">
      <h3 class="text-400">
        Mis datos
      </h3>
      <nav>
        <nuxt-link to="/usuario">
          Editar
        </nuxt-link>
      </nav>
    </article>
    <article class="stack stack-200">
      <h3 class="text-400">
        Publicaciones
      </h3>
      <nav>
        <nuxt-link to="/publicaciones">
          Listado
        </nuxt-link>
      </nav>
    </article>
    <article class="stack stack-200">
      <h3 class="text-400">
        Suscripciones
      </h3>
      <nav>
        <nuxt-link to="/suscripciones">
          Listado
        </nuxt-link>
      </nav>
    </article>
    <button class="button button-error full-width" @click="logout">
      Cerrar Sesion
    </button>
  </main>
</template>

<script>
import { useSesion, useHandler } from '~/composition/index.js'
export default {
  setup () {
    const $sesion = useSesion()
    const $router = useRouter()
    const $handle = useHandler()

    const logout = $handle(async () => {
      await $sesion.logout()
      $router.push('')
    })

    onMounted(async () => {
      await $sesion.onlyAuthed()
    })

    return {
      logout,
    }
  },
}
</script>
