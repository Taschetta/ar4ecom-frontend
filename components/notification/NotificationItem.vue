<template>
  <article class="notification card" @click="remove(id)" error :type="type">
    <p>{{ message }}</p>
  </article>
</template>

<script>
import { useNotification } from '~/composition/index.js'
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: undefined,
    },
  },
  setup () {
    const { remove } = useNotification()
    return {
      remove,
    }
  },
}
</script>

<style lang="scss">

.notification {
  // Size
  max-width: 40ch;
  max-height: 80vh;
  overflow-y: auto;
  // Other
  cursor: pointer;

  transition: all 250ms ease;
}

.notification + .notification {
  margin-top: var(--space-300);
}

</style>
