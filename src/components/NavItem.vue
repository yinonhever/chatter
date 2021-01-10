<template>
  <RouterLink
    v-if="link"
    :to="link"
    class="header__nav-link"
    activeClass="active"
  >
    <slot />
  </RouterLink>
  <span v-else class="header__nav-link">
    <slot />
  </span>
</template>

<script>
export default {
  props: {
    link: String,
  },
};
</script>
