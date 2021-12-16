<template>
  <div class="input">
    <div class="input-container">
      <span v-if="count === 0">Subir imagenes...</span>
      <span v-if="count === 1">{{ count }} imagen cargada</span>
      <span v-if="count > 1">{{ count }} imagenes cargadas</span>
      <input
        :id="id"
        :required="required"
        :name="name"
        :accept="accept"
        :multiple="multiple"
        ref="input"
        type="file"
        @input="load"
      >
    </div>
    <div v-if="count > 0" class="image-container">
      <div class="scroll-x">
        <div class="image" v-for="(url, index) in urls" :key="index">
          <img :src="url">
        </div>
      </div>
    </div>
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
      default: 'image/*',
    },
    multiple: {
      type: Boolean,
      default: true,
    },
  },
  setup () {
    // Refs

    const input = ref(null)

    // Data

    const count = ref(0)
    const urls = ref([])

    // Actions

    const load = () => {
      urls.value = []
      count.value = input.value.files.length

      for (let i = 0; i < input.value.files.length; i++) {
        const file = input.value.files[i]
        const src = URL.createObjectURL(file)
        urls.value.push(src)
      }
    }

    const clean = () => {
      input.value.value = ''
      load()
    }

    return {
      input,
      count,
      urls,
      load,
      clean,
    }
  },
}
</script>

<style lang="scss" scoped>

.input {
  padding: 0;
}

.input-container {
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

.image-container {
  position: relative;

  > * {
    padding: var(--space-200);
    padding-top: 0;
    gap: var(--space-200);
  }

  img {
    border-radius: 10px;
    box-shadow: var(--shadow-200);
    min-width: 200px;
    height: 100%;
    object-fit: contain;
  }

}

</style>
