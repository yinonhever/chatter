<template>
  <Page title="My Chats" :showHeading="false">
    <Spinner v-if="loading" />
    <ErrorMessage v-else-if="error" :error="error" />
    <div v-else>
      <p>{{ chat._id }}</p>
    </div>
  </Page>
</template>

<script>
import axios from "axios";
import socket from "socket.io-client";

export default {
  props: {
    addressUserId: String,
  },
  data() {
    return {
      chat: {},
      loading: true,
      error: null,
    };
  },
  methods: {
    async loadChat() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/chats/${this.addressUserId}`,
          { headers: { Authorization: this.$store.getters.token } }
        );
        this.chat = response.data.chat;
      } catch (error) {
        this.error = error;
      }
      this.loading = false;
    },
  },
  created() {
    this.loadChat();
    const io = socket("http://localhost:5000");
    io.emit("message");
    console.log(io);
  },
};
</script>
