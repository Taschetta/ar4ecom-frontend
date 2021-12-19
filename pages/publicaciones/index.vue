<template>
  <main class="card center stack" size="max-content">
    <h2 class="text-500">
      Publicaciones
    </h2>
    <TableBase
      :columns="['Título', 'Descripcion', 'Creador', 'Ultima modificación']"
      :length="items.length"
    >
      <TableRow
        v-for="(item, index) in items" :key="index"
        :value="item.id"
        :selected.sync="selected"
      >
        <td>{{ item.titulo }}</td>
        <td>{{ item.descripcion }}</td>
        <td>{{ item.usuario.nombre }}</td>
        <td>
          {{ (new Date(item.fechaActualizado)).toLocaleDateString() }}
        </td>
      </TableRow>
    </TableBase>
    <nav class="flex justify-end">
      <nuxt-link class="button" :to="`/publicaciones/${selected}`" :disabled="!canRead">
        Ver
      </nuxt-link>
    </nav>
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

    // Data

    const items = ref([])
    const selected = ref(0)

    // Permissions

    const canRead = computed(() => {
      return selected.value !== 0
    })

    // Data loading

    const loadItems = $handle(async () => {
      items.value = await $resources.findMany()
    })

    // Lifecycle hooks

    onMounted(async () => {
      await $sesion.onlyAuthed()
      await loadItems()
    })

    return {
      items,
      selected,
      canRead,
    }
  },
}
</script>
