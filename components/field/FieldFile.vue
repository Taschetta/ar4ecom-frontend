<template>
  <div>
    <label
      :class="{ hidden: hideLabel }"
      :for="id"
    >
      {{ label }}
    </label>
    <InputFile
      :id="id"
      :name="name"
      :required="required"
      :accept="accept"
      :multiple="multiple"
      @input="input"
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
    name: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
    hideLabel: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: String,
      default: '',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    input (files) {
      this.$emit('input', files)
    },
  },
}
</script>
