<template>
  <Page title="My Chats">
    <Spinner v-if="loading" />
    <ErrorMessage v-else-if="error" :error="error" />
    <ChatList v-else-if="chats.length" :chats="chats" />
    <NoChats v-else />
  </Page>
</template>

<script>
import axios, { baseURL } from "../axios";
import socket from "socket.io-client";
import ChatList from "../components/ChatList";
import NoChats from "../components/NoChats";

export default {
  components: { ChatList, NoChats },
  data() {
    return {
      chats: [],
      loading: true,
      error: null,
      io: socket(baseURL),
    };
  },
  methods: {
    async loadChats(handleError = true) {
      try {
        const response = await axios.get("/api/chats", {
          headers: { Authorization: this.$store.getters.token },
        });
        this.chats = response.data;
        this.io.emit(
          "joinRooms",
          ...this.chats.map((chat) => chat._id),
          this.$store.getters.user._id
        );
      } catch (error) {
        if (handleError) {
          this.error = error;
        }
      }
      this.loading = false;
    },
    initSocket() {
      this.io.on("addMessage", ({ chatId, message }) => {
        const index = this.chats.findIndex((chat) => chat._id === chatId);
        if (index >= 0) {
          this.chats[index].lastMessage = message;
          if (message.sender._id !== this.$store.getters.user._id) {
            this.chats[index].unreadMessages++;
          }
          this.chats.sort(
            (a, b) =>
              new Date(b.lastMessage.sentAt) - new Date(a.lastMessage.sentAt)
          );
        } else {
          this.loadChats(false);
        }
      });
      this.io.on("deleteMessage", () => this.loadChats(false));
    },
  },
  created() {
    this.loadChats();
    this.initSocket();
  },
};
</script>
