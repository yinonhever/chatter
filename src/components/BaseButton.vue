<template>
  <RouterLink v-if="link" :to="link" class="button">
    <slot />
  </RouterLink>
  <button v-else class="button">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    link: String,
  },
};
</script>

<style lang="scss">
.button {
  display: block;
  padding: 1rem;
  background-color: #007bff;
  color: #fff;
  text-transform: uppercase;
  font: inherit;
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: 1.3px;
  border-radius: 100px;
  border: none;
  outline: none !important;
  transition: all 0.4s;
  margin-top: 1rem;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: #007bff;
    box-shadow: rgba(62, 57, 107, 0.3) 0px 6px 16px 0px;
  }

  &:active {
    outline: none;
  }
}
</style>
