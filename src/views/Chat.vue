<template>
  <Page title="My Chats" :showHeading="false">
    <Spinner v-if="loading" />
    <ErrorMessage v-else-if="error" :error="error" />
    <div v-else class="timeline">
      <TimelineDate
        v-for="dateItem in dates"
        :key="dateItem.date"
        v-bind="dateItem"
      />
    </div>
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
      sending: false,
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
    async sendMessage() {},
    dates() {
      const dates = [];
      this.chat.messages.forEach((message) => {
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
  created() {
    this.loadChat();
    const io = socket("http://localhost:5000");
    console.log(io);
  },
};
</script>
