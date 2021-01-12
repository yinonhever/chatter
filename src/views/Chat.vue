<template>
  <Page title="Chat">
    <Spinner v-if="loading" />
    <ErrorMessage v-else-if="errorLoading" :error="errorLoading" />
    <div v-else class="chat zoom-in">
      <ChatHeader :user="correspondent" />
      <ChatMain :messages="messages" @delete-message="deleteMessage" />
      <ChatInputArea
        :input="input"
        @changed="setInput"
        @send="sendMessage"
        :sending="sending"
      />
    </div>
    <ErrorMessage v-if="errorSending" :error="errorSending" />
  </Page>
</template>

<script>
import axios from "axios";
import socket from "socket.io-client";
import ChatHeader from "../components/ChatHeader";
import ChatMain from "../components/ChatMain";
import ChatInputArea from "../components/ChatInputArea";

export default {
  components: { ChatHeader, ChatMain, ChatInputArea },
  props: {
    addressUserId: String,
  },
  data() {
    return {
      chat: { messages: [] },
      input: "",
      loading: true,
      errorLoading: null,
      sending: false,
      errorSending: null,
    };
  },
  computed: {
    correspondent() {
      return this.chat.users.find(
        (user) => user._id !== this.$store.getters.user._id
      );
    },
    messages() {
      return [...this.chat.messages].reverse();
    },
  },
  methods: {
    async loadChat() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/chats/${this.addressUserId}`,
          { headers: { Authorization: this.$store.getters.token } }
        );
        this.chat = response.data.chat;
        this.markAsRead();
      } catch (error) {
        this.errorLoading = error;
      }
      this.loading = false;
    },
    markAsRead() {
      axios.put(
        `http://localhost:5000/api/chats/${this.chat._id}/read`,
        {},
        { headers: { Authorization: this.$store.getters.token } }
      );
    },
    initSocket() {
      const io = socket("http://localhost:5000");
      io.on("addMessage", ({ message }) => {
        this.chat.messages.unshift(message);
        if (message.sender._id !== this.$store.getters.user._id) {
          const sound = new Audio("/audio/message-received.mp3");
          sound.play();
        }
      });
      io.on("deleteMessage", ({ messageId }) => {
        this.chat.messages = this.chat.messages.filter(
          (message) => message._id !== messageId
        );
      });
    },
    setInput(event) {
      this.input = event.target.value;
    },
    async sendMessage() {
      if (!this.input.trim()) return;
      this.sending = true;
      try {
        await axios.post(
          `http://localhost:5000/api/chats/${this.chat._id}`,
          { message: this.input },
          { headers: { Authorization: this.$store.getters.token } }
        );
        this.input = "";
        this.errorSending = null;
      } catch (error) {
        this.errorSending = error;
      }
      this.sending = false;
    },
    deleteMessage(messageId) {
      this.chat.messages = this.chat.messages.filter(
        (message) => message._id !== messageId
      );
      axios.delete(
        `http://localhost:5000/api/chats/${this.chat._id}/${messageId}`,
        { headers: { Authorization: this.$store.getters.token } }
      );
    },
  },
  created() {
    this.loadChat();
    this.initSocket();
  },
};
</script>

<style lang="scss">
.chat {
  width: 100%;
  max-width: 55rem;
  margin: auto;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: rgba(62, 57, 107, 0.36) 0px 16px 38px -12px,
    rgba(62, 57, 107, 0.12) 0px 4px 25px 0px,
    rgba(62, 57, 107, 0.2) 0px 8px 10px -5px;
}
</style>
