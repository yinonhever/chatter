<template>
  <a :href="to" rel="noopener noreferrer" target="_blank" class="link">
    <slot />
  </a>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.link {
  font-weight: 500;
  transition: color 0.4s;

  &:hover {
    color: #007bff;
  }
}
</style>
