<template>
  <main class="card center stack">
    <h2 class="text-500 text-center">
      Bienvenido a ar4ecom!
    </h2>
    <article class="stack stack-200">
      <h3 class="text-400">
        Mis perfil
      </h3>
      <nav>
        <nuxt-link to="/usuario" class="link">
          Mis datos
        </nuxt-link>
        <nuxt-link to="/usuario/publicaciones" class="link">
          Mis Publicaciones
        </nuxt-link>
        <button to="/usuario" class="link" @click="logout">
          Cerrar sesión
        </button>
      </nav>
    </article>
    <!-- <article class="stack stack-200">
      <h3 class="text-400">
        Publicaciones
      </h3>
      <nav>
        <nuxt-link to="/publicaciones" class="link">
          Listado
        </nuxt-link>
      </nav>
    </article>
    <article class="stack stack-200">
      <h3 class="text-400">
        Suscripciones
      </h3>
      <nav>
        <nuxt-link to="/suscripciones" class="link">
          Listado
        </nuxt-link>
      </nav>
    </article> -->
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
      $router.push('/sesion/iniciar')
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
