<template>
  <main class="card center stack">
    <h2 class="text-500">
      Publicación
    </h2>
    <form id="Form" class="form" @submit.prevent="submit">
      <FieldFile id="InputPrePublicacion" label="Archivo con características" name="prePublicacion" @input="loadFile" :required="!id" />

      <label for="InputTitulo">Titulo</label>
      <input id="InputTitulo" v-model="item.titulo" type="text" name="titulo" required>

      <label for="InputDescripcion">Descripcion</label>
      <textarea id="InputDescripcion" v-model="item.descripcion" type="text" name="descripcion" required />

      <label for="InputEtiquetas">Etiquetas</label>
      <input id="InputEtiquetas" v-model="item.etiquetas" type="text" name="etiquetas" required>

      <FieldFile id="InputAssetAndroid" label="Archivo asset Android" name="bundleAndroid" :required="!id" />
      <FieldFile id="InputAssetIOS" label="Archivo asset IOS" name="bundleIOS" :required="!id" />

      <FieldImage id="inputImagenes" label="Imagenes" name="imagenes" />
    </form>
    <div v-if="item.imagenesGuardadas && item.imagenesGuardadas.length">
      <label>
        Imagenes guardadas
      </label>
      <ImageReel
        editable
        :images="item.imagenesGuardadas"
        @remove="removeImagen"
      />
    </div>
    <nav class="flex justify-end">
      <nuxt-link class="button" to="/usuario/publicaciones">
        Volver
      </nuxt-link>
      <button form="Form" class="button">
        Guardar
      </button>
    </nav>
  </main>
</template>

<script>
import { useResources, useHandler, useSesion, useFile, useSaving } from '~/composition/index.js'
export default {
  setup () {
    // Composables

    const $publicaciones = useResources('/usuario/publicaciones')
    const $handle = useHandler()
    const $saving = useSaving()
    const $route = useRoute()
    const $router = useRouter()
    const $sesion = useSesion()
    const $file = useFile()

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

    const submit = $handle($saving(async (event) => {
      const formData = new FormData(event.target)

      formData.delete('etiquetas')

      item.value.etiquetas.replace(/, /g, ',').split(',').forEach((etiqueta, index) => {
        formData.append(`etiquetas[${index}]`, etiqueta)
      })

      if (item.value.imagenesGuardadas) {
        item.value.imagenesGuardadas.forEach((image, index) => {
          formData.append(`imagenesGuardadas[${index}]`, image)
        })
      }

      if (id.value) {
        await $publicaciones.updateOne(id.value, formData)
      } else {
        await $publicaciones.insertOne(formData)
      }
      $router.back()
    }))

    const removeImagen = (index) => {
      item.value.imagenesGuardadas.splice(index, 1)
    }

    // Data loading

    const loadItem = $handle(async () => {
      item.value = await $publicaciones.findOne(id.value)
      item.value.etiquetas = item.value.etiquetas.join(', ')
    })

    const loadFile = $handle(async (files) => {
      const data = await $file.asJSON(files[0])
      item.value.titulo = data.titulo
      item.value.descripcion = data.descripcion
      item.value.etiquetas = data.etiquetas.join(', ')
      item.value.prePublicacion = data
    })

    // Lifecycle hooks

    onMounted(async () => {
      await $sesion.onlyAuthed()
      await loadItem()
    })

    return {
      id,
      item,
      canWrite,
      submit,
      removeImagen,
      loadFile,
    }
  },
}
</script>
