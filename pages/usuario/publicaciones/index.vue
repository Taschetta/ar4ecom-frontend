<template>
  <main class="card center stack" size="max-content">
    <h2 class="text-500">
      Mis Publicaciones
    </h2>
    <TableBase
      :columns="['Visibilidad', 'Título', 'Descripcion', 'Ultima modificación']"
      :length="items.length"
    >
      <TableRow
        v-for="(item, index) in items" :key="index"
        :value="item.id"
        :selected.sync="selectedId"
      >
        <td>
          <button class="button" :success="!item.privado" :error="!!item.privado" small @click.stop="toggle('privado', item)">
            {{ item.privado ? 'Privado' : 'Público' }}
          </button>
        </td>
        <td>{{ item.titulo }}</td>
        <td>{{ item.descripcion }}</td>
        <td>
          {{ (new Date(item.fechaActualizado)).toLocaleString() }}
        </td>
      </TableRow>
    </TableBase>
    <nav class="flex justify-end">
      <nuxt-link class="button" to="/usuario/publicaciones/0">
        Nueva
      </nuxt-link>
      <nuxt-link class="button" :to="`/usuario/publicaciones/${selectedId}`" :disabled="!canRead">
        Ver
      </nuxt-link>
      <button class="button" @click="remove" :disabled="!canWrite">
        Eliminar
      </button>
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

    // Selected

    const selectedId = ref(0)
    const selected = computed(() => {
      return items.value.find(item => item.id === selectedId.value)
    })

    // Permissions

    const canRead = computed(() => {
      return selectedId.value !== 0
    })

    const canWrite = computed(() => {
      return selected.value && $sesion.usuario.value.id === selected.value.fkUsuario
    })

    // Helpers

    const checkWrite = (item = selected.value) => {
      if ($sesion.usuario.value.id !== item.fkUsuario) {
        throw new Error('No podes editar una publicación que no es tuya')
      }
    }

    // Actions

    const toggle = $handle(async (field, item) => {
      checkWrite(item)
      await $resources.updateOne(item.id, { [field]: !item[field] })
      await loadItems()
    })

    const remove = $handle(async () => {
      checkWrite()
      await $resources.removeOne({ id: selected.value.id })
      await loadItems()
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
      // Data
      items,
      selectedId,
      // Permissions
      canRead,
      canWrite,
      // Actions
      toggle,
      remove,
    }
  },
}
</script>
