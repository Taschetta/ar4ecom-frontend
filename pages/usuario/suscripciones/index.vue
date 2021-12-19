<template>
  <main class="card center stack" size="max-content">
    <h2 class="text-500">
      Mis suscripciones
    </h2>
    <TableBase
      :columns="['Publicacion', 'Publicador', 'Información', 'Fecha de Creación']"
      :length="items.length"
    >
      <TableRow
        v-for="(item, index) in items" :key="index"
        :value="item.id"
        :selected.sync="selected"
      >
        <td>{{ item.publicacion.titulo }}</td>
        <td>{{ item.publicacion.usuario.nombre }}</td>
        <td>{{ item.info }}</td>
        <td>{{ (new Date(item.fechaAlta)).toLocaleDateString() }}</td>
      </TableRow>
    </TableBase>
    <nav class="flex justify-end">
      <nuxt-link class="button" :to="`/usuario/suscripciones/${selected}`" :disabled="!selected">
        Modificar
      </nuxt-link>
      <button class="button" @click="remove" :disabled="!selected">
        Eliminar
      </button>
    </nav>
  </main>
</template>

<script>
import { useSesion, useResources, useHandler } from '~/composition/index.js'
export default {
  setup () {
    // Resources
    const $suscripciones = useResources('/usuario/suscripciones')

    // Composables
    const $sesion = useSesion()
    const $handle = useHandler()

    // Data
    const items = ref([])
    const selected = ref(0)

    // Actions

    const remove = $handle(async () => {
      await $suscripciones.removeOne({ id: selected.value })
      await loadItems()
    })

    const loadItems = $handle(async () => {
      items.value = await $suscripciones.findMany()
    })

    // Lifecycle Hooks

    onMounted(async () => {
      await $sesion.onlyAuthed()
      await loadItems()
    })

    return {
      items,
      selected,
      remove,
    }
  },
}
</script>

<style>

</style>
