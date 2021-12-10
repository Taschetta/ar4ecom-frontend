<template>
  <div class="notifications-container">
    <transition-group name="fade">
      <NotificationItem
        v-for="item in items" :key="item.id"
        v-bind="item"
      />
    </transition-group>
  </div>
</template>

<script>
import { useNotification } from '~/composition/index.js'

export default {
  setup () {
    const { items, remove } = useNotification()

    return {
      items,
      remove,
    }
  },
}
</script>

<style lang="scss">

.notifications-container {
  position: fixed;
  bottom: 1em;
  right: 1em;
  z-index: 100000;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.fade-leave-active {
  position: absolute;
}

</style>
