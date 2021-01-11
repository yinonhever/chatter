<template>
  <Page title="Chat" :showHeading="false">
    <Spinner v-if="loading" />
    <ErrorMessage v-else-if="errorLoading" :error="errorLoading" />
    <div v-else class="chat zoom-in">
      <div class="chat__top"></div>
      <div class="chat__main">
        <div class="timeline">
          <TimelineDate
            v-for="dateItem in dates"
            :key="dateItem.date"
            v-bind="dateItem"
          />
        </div>
      </div>
      <div class="chat__bottom">
        <form class="chat__form" @submit.prevent="sendMessage">
          <input
            v-model.trim="input"
            class="chat__input"
            placeholder="Type a message..."
            aria-label="Type a message"
          />
        </form>
      </div>
    </div>
    <Spinner v-if="sending" />
  </Page>
</template>

<script>
import axios from "axios";
import moment from "moment";
import socket from "socket.io-client";
import TimelineDate from "../components/TimelineDate";

export default {
  components: { TimelineDate },
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
    messages() {
      const messages = [...this.chat.messages];
      return messages.reverse();
    },
    dates() {
      const dates = [];
      this.messages.forEach((message) => {
        const existingDateIndex = dates.findIndex(
          (item) =>
            moment(item.date).format("LL") ===
            moment(message.sentAt).format("LL")
        );
        if (existingDateIndex >= 0) {
          dates[existingDateIndex].messages.push(message);
        } else {
          dates.push({
            date: new Date(message.sentAt),
            messages: [message],
          });
        }
      });
      return dates;
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
    },
    async sendMessage() {
      try {
        this.sending = true;
        await axios.post(
          `http://localhost:5000/api/chats/${this.chat._id}`,
          { message: this.input },
          { headers: { Authorization: this.$store.getters.token } }
        );
        this.input = "";
      } catch (error) {
        this.errorSending = error;
      }
      this.sending = false;
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
  max-width: 66.66rem;
  margin: auto;

  &__main {
    padding: 3rem;
  }
}
</style>
