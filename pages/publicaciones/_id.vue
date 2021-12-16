<template>
  <main class="[ card ][ center stack stack-500 ]">
    <h2 class="text-500 bold">
      {{ item.titulo }}
    </h2>
    <section class="stack stack-400">
      <h3 class="hide-visually">
        Datos de la publicacion
      </h3>
      <dl class="[ definition-list ][ stack stack-300 ]">
        <dt>Publicador</dt>
        <dd>{{ item.usuario }}</dd>
        <dt>Etiquetas</dt>
        <dd>{{ item.etiquetas }}</dd>
        <dt>Descripción</dt>
        <dd>{{ item.descripcion }}</dd>
        <dt>Imagenes</dt>
        <dd><ImageReel :images="item.imagenes" /></dd>
        <dt>Codigo QR</dt>
        <dd>
          <img
            class="image"
            :src="`https://www.codigos-qr.com/qr/php/qr_img.php?d=applauncher.roldos.ar4ecom.v1%3A%2F%2Fid%3FS${item.id}&s=6&e=m`"
          >
        </dd>
        <!-- <dt>Secciones</dt>
        <dd class="columns">
          <article
            v-for="seccion in secciones"
            :key="seccion.nombre"
          >
            <h4 class="text-200">
              {{ seccion.nombre }}
            </h4>
          </article>
        </dd> -->
      </dl>
    </section>
    <section>
      <h3 class="hide-visually">
        Acciones
      </h3>
      <nav class="flex justify-end">
        <button class="button" @click="back">
          Volver
        </button>
        <button class="button" @click="suscribe">
          Suscribirme
        </button>
      </nav>
    </section>
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
    const $router = useRouter()
    const $route = useRoute()

    // Data: Static

    const id = parseInt($route.params.id)

    // Data: Reactive

    const item = ref({})

    // Data: Computed

    const secciones = computed(() => {
      return item.value.prePublicacion?.seccionColor || []
    })

    // Actions

    const back = () => {
      $router.back()
    }

    const suscribe = () => {

    }

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
      secciones,
      back,
      suscribe,
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
.columns {
  column-count: 2;
  column-width: max-content;
}

</style>
