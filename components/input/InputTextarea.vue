<template>
  <textarea
    :id="id"
    v-model="localValue"
    :required="required"
    :name="name"
    rows="8"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
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
  }
}
</script>
