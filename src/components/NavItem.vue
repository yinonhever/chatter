<template>
  <li class="header__nav-item" @click="closeNav">
    <RouterLink v-if="link" :to="link" activeClass="active">
      <slot />
    </RouterLink>
    <span v-else>
      <slot />
    </span>
  </li>
</template>

<script>
export default {
  props: {
    link: String,
  },
  inject: ["closeNav"],
};
</script>
