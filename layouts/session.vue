<template>
  <div id="app" class="app-container bg-pattern-dotted">
    <header class="app-header">
      <h1 class="text-600 text-center">
        ar4ecom
      </h1>
    </header>
    <NotificationList />
    <div class="app-main-container">
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">

.app-container {

  > .app-header {
    background-color: var(--clr-gray-100);
    padding: var(--space-600);
    box-shadow: var(--shadow-400);
  }

  > .app-main-container {
    padding: var(--space-600);
  }
}

</style>
