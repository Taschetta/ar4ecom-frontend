<template>
  <div>
    <label 
      :class="{ hidden: hideLabel }"
      :for="id"
    >
      {{ label }}
    </label>
    <InputText
      :id="id"
      v-model="localValue"
      :name="name"
      :required="required"
      :email="email"
    />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: null,
    },
    email: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    hideLabel: {
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
