<template>
  <Page :title="title">
    <Spinner v-if="loading" />
    <ErrorMessage v-else-if="error" :error="error" />
    <Timeline v-else :messages="messages" />
  </Page>
</template>

<script>
import Timeline from "./Timeline";

export default {
  components: { Timeline },
  props: {
    account: String,
  },
  data() {
    return {
      loading: true,
      error: null,
    };
  },
  computed: {
    title() {
      return this.account === "main"
        ? "Main Account"
        : this.account === "side"
        ? "Side Account"
        : null;
    },
    messages() {
      return this.$store.getters.messages;
    },
  },
  methods: {
    async loadMessages() {
      try {
        await this.$store.dispatch("loadMessages", this.account);
      } catch (error) {
        this.error = error;
      }
      this.loading = false;
    },
  },
  created() {
    this.loadMessages();
    document.querySelector("body").style.overflowY = "scroll";
  },
};
</script>
