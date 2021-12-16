<template>
  <input
    :id="id"
    v-model="localValue"
    :required="required"
    :type="type"
    :name="name"
  >
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
    email: {
      type: Boolean,
      default: false,
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
    type() {
      if(this.email) {
        return 'email'
      }
      return 'text'
    },
  }
}
</script>
