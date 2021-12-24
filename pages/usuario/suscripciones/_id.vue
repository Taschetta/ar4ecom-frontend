<template>
  <main class="card center stack">
    <h2 class="text-500">
      Suscripcion
    </h2>
    <section class="stack stack-400">
      <h3 class="text-400">
        Datos de la publicación
      </h3>
      <dl class="[ definition-list ][ stack stack-300 ]">
        <dt>Titulo de la publicación</dt>
        <dd>{{ item.publicacion.titulo }}</dd>
        <dt>Publicador</dt>
        <dd>{{ item.publicacion.usuario.nombre }}</dd>
        <dt>Etiquetas</dt>
        <dd>{{ item.publicacion.etiquetas.join(', ') }}</dd>
        <dt>Descripción</dt>
        <dd>{{ item.publicacion.descripcion }}</dd>
      </dl>
    </section>
    <section class="stack stack-400">
      <h3 class="text-400">
        Datos de la suscripción
      </h3>
      <form id="MainForm" class="form" @submit.prevent="submit">
        <FieldText id="InputEtiquetaURL" v-model="item.etiqueta_url" label="Texto del link" />
        <FieldText id="InputUrl" v-model="item.url_suscriptor" label="Link URL" />
        <FieldTextarea id="InputInformacion" v-model="item.info" label="Información" />
        <FieldTextarea id="InputNotas" v-model="item.notas" label="Notas" />
      </form>
    </section>
    <section class="stack stack-400">
      <h3 class="text-400">
        Copiar estos datos a su catalogo web
      </h3>
      <dl class="[ definition-list ][ stack stack-300 ]">
        <dt>Link para compartir</dt>
        <dd>
          <a class="link" :href="`applauncher.roldos.ar4ecom.v1://id?S${item.id}`">
            applauncher.roldos.ar4ecom.v1://id?S{{ item.id }}
          </a>
        </dd>
        <dt>Codigo QR</dt>
        <dd>
          <img
            class="image"
            :src="`https://www.codigos-qr.com/qr/php/qr_img.php?d=applauncher.roldos.ar4ecom.v1%3A%2F%2Fid%3FS${item.id}&s=6&e=m`"
          >
        </dd>
      </dl>
    </section>
    <nav class="flex justify-end">
      <nuxt-link class="button" to="/usuario/suscripciones">
        Volver
      </nuxt-link>
      <button class="button" form="MainForm">
        Guardar
      </button>
    </nav>
  </main>
</template>

<script>
import { useSesion, useResources, useHandler, useSaving } from '~/composition/index.js'
export default {
  setup () {
    // Resources
    const $suscripciones = useResources('/usuario/suscripciones')

    // Composables
    const $sesion = useSesion()
    const $handle = useHandler()
    const $saving = useSaving()
    const $router = useRouter()
    const $route = useRoute()

    // Data
    // - static
    const id = parseInt($route.params.id)

    // - reactive
    const item = ref({
      publicacion: {
        usuario: {},
        etiquetas: [],
      },
    })

    // Actions

    const submit = $handle($saving(async () => {
      await $suscripciones.updateOne(id, item.value)
      $router.push('/usuario/suscripciones')
    }))

    const loadItem = $handle(async () => {
      item.value = await $suscripciones.findOne(id)
    })

    // Lifecycle Hooks

    onMounted(async () => {
      await $sesion.onlyAuthed()
      await loadItem()
    })

    return {
      item,
      submit,
    }
  },
}
</script>

<style lang="scss" scoped>

.image {
  display: block;
  margin: auto;
  border-radius: 10px;
  box-shadow: var(--shadow-200);
  min-width: 200px;
  height: 100%;
  object-fit: contain;
}

</style>
