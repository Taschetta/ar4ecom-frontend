<template>
  <div class="input">
    <span v-if="count === 0">Subir un archivo...</span>
    <span v-if="count === 1">{{ count }} archivo cargado</span>
    <span v-if="count > 1">{{ count }} archivos cargados</span>
    <input
      :id="id"
      :required="required"
      :name="name"
      :accept="accept"
      :multiple="multiple"
      ref="inputElement"
      type="file"
      @input="input"
    >
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
    required: {
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
  setup (props, { emit }) {
    // Refs

    const inputElement = ref(null)

    // Data

    const count = ref(0)

    const input = () => {
      const files = inputElement.value.files
      count.value = files.length
      emit('input', files)
    }

    return {
      inputElement,
      count,
      input,
    }
  },
}
</script>

<style lang="scss" scoped>

.input {
  position: relative;
  border-radius: 10px;
  padding: var(--space-400) var(--space-500);

  outline: 2px dashed var(--clr-gray-300);
  outline-offset: calc(var(--space-200) * -1);

  color: var(--clr-gray-600);

  > span {
    cursor: pointer;
  }

  > input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
}

</style>
