<template>
  <main class="chat__main" ref="container">
    <div v-if="!messages.length" class="chat__empty">
      <i class="far fa-comments" />
      <p>Start a chat by typing a message below.</p>
    </div>
    <div v-else class="chat__timeline">
      <ChatDate
        v-for="dateItem in dates"
        :key="dateItem.date"
        v-bind="dateItem"
        @delete-message="(messageId) => $emit('delete-message', messageId)"
      />
    </div>
  </main>
</template>

<script>
import moment from "moment";
import Scrollbar from "smooth-scrollbar";
import ChatDate from "./ChatDate";

export default {
  components: { ChatDate },
  props: {
    messages: {
      type: Array,
      required: true,
    },
  },
  computed: {
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
  mounted() {
    Scrollbar.init(this.$refs.container);
  },
};
</script>

<style lang="scss">
.chat {
  &__main {
    height: 50rem;
    overflow: auto;
    background-color: rgba(#fff, 0.6);
    position: relative;

    .scroll-content {
      min-height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
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
    padding: 2.5rem 2rem;
    width: 100%;
    height: 100%;
    overflow: auto;
    position: relative;
    align-self: flex-start;

    @media only screen and (max-width: 500px) {
      padding: 2rem 0.8rem;
    }
  }
}
</style>
