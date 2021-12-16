<template>
  <select
    :id="id"
    v-model="localValue"
    :required="required"
    :name="name"
  >
    <option
      v-for="option in options"
      :key="option[optionLabel]"
      :value="option[optionValue]"
    >
      {{ option[optionLabel] }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    optionValue: {
      type: String,
      default: 'id',
    },
    optionLabel: {
      type: String,
      default: 'name',
    },
    required: {
      type: Boolean,
      default: true,
    }
  },
  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
  },
}
</script>
