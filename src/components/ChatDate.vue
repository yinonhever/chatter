<template>
  <section class="date-section">
    <h3 class="date-section__date">
      {{ displayedDate }}
    </h3>
    <TransitionGroup tag="div" class="date-section__messages" name="messages">
      <ChatMessage
        v-for="message in messages"
        :key="message._id"
        :message="message"
      />
    </TransitionGroup>
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
  position: relative;

  &:not(:first-child) {
    margin-top: 5rem;

    &::after {
      content: "";
      position: absolute;
      bottom: calc(100% + 2.3rem);
      left: 50%;
      transform: translateX(-50%);
      height: 1px;
      width: 12rem;
      max-width: 40%;
      background-color: #ccc;
    }
  }

  &__date {
    text-align: center;
    margin-bottom: 2rem;
    font-weight: 500;
    font-size: 1.6rem;
  }
}
</style>
