<template>
  <div class="table-container scroll-x">
    <table class="table interactive">
      <thead>
        <tr>
          <th class="column-select" />
          <th v-for="(column, index) in columns" :key="index">
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="length === 0">
          <td :colspan="columnCount">
            Sin datos
          </td>
        </tr>
        <slot />
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    length: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    columnCount () {
      return this.columns.length + 1
    },
  },
}
</script>
