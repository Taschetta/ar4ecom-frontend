<template>
  <div class="image-container scroll-x shadow-200">
    <div v-for="(image, index) in images" class="image relative" :key="image">
      <button class="material-icons" @click.prevent="remove(index)">
        close
      </button>
      <img :src="image" width="500" height="500">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    remove (index) {
      this.$emit('remove', index)
    },
  },
}
</script>

<style lang="scss" scoped>

.image-container {
  border-radius: 10px;

  > .image {
    padding: var(--space-200);
    gap: var(--space-200);
    position: relative;
  }

  button {
    position: absolute;
    top: var(--space-300);
    right: var(--space-300);

    padding: var(--space-100);

    box-shadow: var(--shadow-200);

    border: none;
    border-radius: 100%;
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
