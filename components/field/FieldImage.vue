<template>
  <div>
    <label
      :class="{ hidden: hideLabel }"
      :for="id"
    >
      {{ label }}
    </label>
    <InputImage
      :id="id"
      :name="name"
      :required="required"
      :accept="accept"
      :multiple="multiple"
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
      default: 'image/*',
    },
    multiple: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
