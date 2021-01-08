<template>
  <main>
    <h2 v-if="showHeading" class="page-heading">{{ title }}</h2>
    <slot />
  </main>
</template>

<script>
export default {
  props: {
    title: String,
    showHeading: {
      type: Boolean,
      default: true,
    },
  },
  created() {
    document.title = this.title ? `${this.title} – Chatter` : "Chatter";
  },
};
</script>

<style lang="scss">
.page-heading {
  text-align: center;
  font-size: 3.5rem;
  margin-bottom: 4rem;
}
</style>
