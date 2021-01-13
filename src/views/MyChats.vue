<template>
  <Page title="My Chats">
    <Spinner v-if="loading" />
    <ErrorMessage v-else-if="error" :error="error" />
    <ChatList v-else-if="chats.length" :chats="chats" />
    <NoChats v-else />
  </Page>
</template>

<script>
import axios from "axios";
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
    initSocket() {
      const io = socket("http://localhost:5000");
      io.on("addMessage", this.messageAddedHandler);
      io.on("deleteMessage", this.messageDeletedHandler);
    },
    messageAddedHandler({ chatId, message }) {
      const index = this.chats.findIndex((chat) => chat._id === chatId);
      if (index >= 0) {
        this.chats[index].lastMessage = message;
        if (message.sender._id !== this.$store.getters.user._id) {
          this.chats[index].unreadMessages++;
        }
        this.updateListOrder();
      }
    },
    async messageDeletedHandler({ chatId }) {
      const index = this.chats.findIndex((chat) => chat._id === chatId);
      if (index >= 0) {
        const { correspondent } = this.chats[index];
        const response = await axios.get(
          `http://localhost:5000/api/chats/${correspondent._id}`,
          { headers: { Authorization: this.$store.getters.token } }
        );
        const { chat, unreadMessages } = response.data;
        this.chats[index].lastMessage = chat.messages[0];
        this.chats[index].unreadMessages = unreadMessages;
        this.updateListOrder();
      }
    },
    updateListOrder() {
      this.chats.sort(
        (a, b) =>
          new Date(b.lastMessage.sentAt) - new Date(a.lastMessage.sentAt)
      );
    },
  },
  created() {
    this.loadChats();
    this.initSocket();
  },
};
</script>
