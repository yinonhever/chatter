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
    if (
      this.$route.path === "/explore" ||
      this.$route.path === "/edit-profile" ||
      this.$route.path.startsWith("/profile") ||
      this.$route.path.startsWith("/chats")
    ) {
      document.querySelector("body").style.overflowY = "scroll";
    } else {
      document.querySelector("body").removeAttribute("style");
    }
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
