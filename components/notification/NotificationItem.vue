<template>
  <article class="notification">
    <p>{{ message }}</p>
  </article>
</template>

<script>
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
  },
}
</script>

<style>

.notification {
  /* max-width: 40ch; */
  /* max-height: 80vh; */
  overflow-y: auto;
}

</style>
