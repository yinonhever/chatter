<template>
  <Page title="Chat">
    <Spinner v-if="loading" />
    <ErrorMessage v-else-if="errorLoading" :error="errorLoading" />
    <div v-else class="chat zoom-in">
      <div class="chat__top">
        <RouterLink class="chat__user" :to="`/profile/${correspondent._id}`">
          <img
            class="chat__avatar"
            :src="correspondent.avatar"
            :alt="correspondent.name"
          />
          <h2 class="chat__username">{{ correspondent.name }}</h2>
        </RouterLink>
      </div>
      <div class="chat__main">
        <div v-if="!messages.length" class="chat__empty">
          <i class="far fa-comments" />
          <p>Start a chat by typing a message below.</p>
        </div>
        <div v-else class="chat__timeline">
          <ChatDate
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
          <BaseButton class="form__button">
            <i class="far fa-paper-plane" />
          </BaseButton>
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
import ChatDate from "../components/ChatDate";

export default {
  components: { ChatDate },
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
      if (!this.input) return;
      this.sending = true;
      try {
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
  max-width: 55rem;
  margin: auto;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: rgba(62, 57, 107, 0.36) 0px 16px 38px -12px,
    rgba(62, 57, 107, 0.12) 0px 4px 25px 0px,
    rgba(62, 57, 107, 0.2) 0px 8px 10px -5px;

  &__top {
    background-color: #007bff;
    color: #fff;
    padding: 1rem;
    display: flex;
    justify-content: center;

    * {
      margin: 0;
    }
  }

  &__user {
    display: flex;
    align-items: center;
  }

  &__avatar {
    width: 5rem;
    border-radius: 50%;
    margin-right: 1rem;
  }

  &__username {
    font-weight: 700;
    font-size: 2rem;
  }

  &__main {
    height: 50rem;
    overflow: auto;
    background-color: rgba(#fff, 0.6);
    position: relative;
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    text-align: center;
    padding: 2rem;

    i {
      font-size: 6rem;
      margin-bottom: 2rem;
    }

    p {
      font-size: 1.6rem;
    }
  }

  &__timeline {
    padding: 3rem 2rem;

    @media only screen and (max-width: 500px) {
      padding: 3rem 0.8rem;
    }
  }

  &__bottom {
    background-color: #eee;
    padding: 1rem 2rem;
  }

  &__form {
    display: flex;
    align-items: center;
  }

  &__input {
    flex: 1;
    border-radius: 100px;
    margin-right: 1.5rem;
    border: 2px solid transparent;
    outline: none;
    padding: 1rem 2rem;
    transition: all 0.5s;

    &:focus {
      border-color: #007bff;
    }
  }

  .button {
    margin: 0;
    padding: 0;

    &,
    &:hover {
      background-color: transparent;
      box-shadow: none;
    }

    i {
      transition: color 0.4s;
      color: #007bff;
      font-size: 2.5rem;

      &:hover {
        color: #1520a6;
      }
    }
  }
}
</style>
