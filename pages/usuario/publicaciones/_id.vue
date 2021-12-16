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
      <div v-if="item.imagenes && item.imagenes.length">
        <label>
          Imagenes guardadas
        </label>
        <ImageReel
          editable
          :images="item.imagenes"
          @remove="removeImagen"
        />
      </div>
    </form>
    <nav class="flex justify-end">
      <button class="button" @click="cancel">
        Cancelar
      </button>
      <button form="Form" class="button">
        Guardar
      </button>
    </nav>
  </main>
</template>

<script>
/* eslint-disable */
import { useResources, useHandler, useSesion, useFile } from '~/composition/index.js'
export default {
  setup () {
    // Composables

    const $publicaciones = useResources('/usuario/publicaciones')
    const $handle = useHandler()
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

    const submit = $handle(async (event) => {
      const formData = new FormData(event.target)
      
      if(item.value.imagenes) {
        item.value.imagenes.forEach((image, index) => {
          formData.append(`imagenesGuardadas[${index}]`, image)
        })
      }
      
      if (id.value) {
        await $publicaciones.updateOne(id.value, formData)
      } else {
        await $publicaciones.insertOne(formData)
      }
      $router.back()
    })

    const cancel = $handle(() => {
      $router.back()
    })

    const removeImagen = (index) => {
      item.value.imagenes.splice(index, 1)
    }

    // Data loading

    const loadItem = $handle(async () => {
      item.value = await $publicaciones.findOne(id.value)
    })

    const loadFile = $handle(async (files) => {
      const data = await $file.asJSON(files[0])
      item.value.titulo = data.titulo
      item.value.descripcion = data.descripcion
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
      cancel,
      submit,
      removeImagen,
      loadFile,
    }
  },
}
</script>
