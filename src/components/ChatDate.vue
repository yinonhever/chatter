<template>
  <section class="date-section">
    <h3 class="date-section__date">
      {{ displayedDate }}
    </h3>
    <div class="date-section__messages">
      <ChatMessage
        v-for="message in messages"
        :key="message._id"
        :message="message"
        @delete="(messageId) => $emit('delete-message', messageId)"
      />
    </div>
  </section>
</template>

<script>
import ChatMessage from "./ChatMessage";
import moment from "moment";

export default {
  components: { ChatMessage },
  props: {
    date: Date,
    messages: Array,
  },
  computed: {
    displayedDate() {
      return (
        moment(this.date).format("ddd") + ", " + moment(this.date).format("ll")
      );
    },
  },
};
</script>

<style lang="scss">
.date-section {
  &:not(:last-child) {
    margin-bottom: 4rem;
  }

  &__date {
    text-align: center;
    margin-bottom: 2rem;
    font-weight: 500;
  }
}
</style>
