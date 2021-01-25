<template>
  <Page title="Chat">
    <Spinner v-if="loading" />
    <ErrorMessage v-else-if="errorLoading" :error="errorLoading" />
    <div v-else class="chat zoom-in">
      <ChatHeader :user="correspondent" />
      <ChatMain :dates="dates" />
      <ChatInputArea :sending="sending" />
    </div>
    <ErrorMessage v-if="errorSending" :error="errorSending" />
  </Page>
</template>

<script>
import axios, { baseURL } from "../axios";
import socket from "socket.io-client";
import moment from "moment";
import { sortByDates } from "../util";
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
      chatId: null,
      dates: [],
      correspondent: null,
      loading: true,
      errorLoading: null,
      sending: false,
      errorSending: null,
      io: socket(baseURL),
    };
  },
  methods: {
    async loadChat() {
      try {
        const response = await axios.get(`/api/chats/${this.addressUserId}`, {
          headers: { Authorization: this.$store.getters.token },
        });
        const { chat } = response.data;
        this.dates = sortByDates(chat.messages.reverse());
        this.correspondent = chat.users.find(
          (user) => user._id !== this.$store.getters.user._id
        );
        this.chatId = chat._id;
        this.markAsRead();
        this.io.emit("joinRooms", this.chatId, this.$store.getters.user._id);
      } catch (error) {
        this.errorLoading = error;
      }
      this.loading = false;
    },
    markAsRead() {
      axios.put(
        `/api/chats/${this.chatId}/read`,
        {},
        { headers: { Authorization: this.$store.getters.token } }
      );
    },
    initSocket() {
      this.io.on("addMessage", ({ message }) => this.addMessage(message));
      this.io.on("deleteMessage", ({ messageId }) =>
        this.removeMessageById(messageId)
      );
    },
    async sendMessage(input) {
      this.sending = true;
      try {
        await axios.post(
          `/api/chats/${this.chatId}`,
          { message: input },
          { headers: { Authorization: this.$store.getters.token } }
        );
        this.errorSending = null;
        this.sending = false;
        return true;
      } catch (error) {
        this.errorSending = error;
        this.sending = false;
      }
    },
    deleteMessage(messageId) {
      this.removeMessageById(messageId);
      axios.delete(`/api/chats/${this.chatId}/${messageId}`, {
        headers: { Authorization: this.$store.getters.token },
      });
    },
    addMessage(message) {
      const index = this.dates.findIndex(
        (item) =>
          moment(item.date).format("LL") === moment(message.sentAt).format("LL")
      );
      if (index >= 0) {
        this.dates[index].messages.push(message);
      } else {
        this.dates.push({
          date: new Date(message.sentAt),
          messages: [message],
        });
      }
      if (message.sender._id !== this.$store.getters.user._id) {
        const sound = new Audio("/audio/message-received.mp3");
        sound.play();
      }
    },
    removeMessageById(messageId) {
      const index = this.dates.findIndex(
        (item) => !!item.messages.find((message) => message._id === messageId)
      );
      if (index >= 0) {
        this.dates[index].messages = this.dates[index].messages.filter(
          (message) => message._id !== messageId
        );
        if (!this.dates[index].messages.length) {
          this.dates.splice(index, 1);
        }
      }
    },
  },
  created() {
    this.loadChat();
    this.initSocket();
  },
  provide() {
    return {
      sendMessage: this.sendMessage,
      deleteMessage: this.deleteMessage,
      getIo: () => this.io,
    };
  },
};
</script>

<style lang="scss">
.chat {
  width: 100%;
  max-width: 50rem;
  margin: auto;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: rgba(62, 57, 107, 0.36) 0px 16px 38px -12px,
    rgba(62, 57, 107, 0.12) 0px 4px 25px 0px,
    rgba(62, 57, 107, 0.2) 0px 8px 10px -5px;
}
</style>
