<template>
  <Page title="My Chats">
    <Spinner v-if="loading" />
    <ErrorMessage v-else-if="error" :error="error" />
    <div v-else>
      <p v-for="chat in chats" :key="chat._id">{{ chat.correspondent.name }}</p>
    </div>
  </Page>
</template>

<script>
import axios from "axios";

export default {
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
        console.log(response.data);
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
