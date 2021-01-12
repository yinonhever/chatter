<template>
  <Page title="My Chats">
    <Spinner v-if="loading" />
    <ErrorMessage v-else-if="error" :error="error" />
    <ChatList v-else :chats="chats" />
  </Page>
</template>

<script>
import axios from "axios";
import ChatList from "../components/ChatList";

export default {
  components: { ChatList },
  data() {
    return {
      chats: [],
      loading: true,
      error: null,
    };
  },
  methods: {
    async loadChats() {
      try {
        const response = await axios.get("http://localhost:5000/api/chats", {
          headers: { Authorization: this.$store.getters.token },
        });
        this.chats = response.data;
      } catch (error) {
        this.error = error;
      }
      this.loading = false;
    },
  },
  created() {
    this.loadChats();
  },
};
</script>
