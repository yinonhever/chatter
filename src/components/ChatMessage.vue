<template>
  <div :class="classes">
    <div class="message__content">
      <p class="message__text">{{ message.content }}</p>
      <span class="message__time">{{ time }}</span>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    message: Object,
  },
  computed: {
    time() {
      return moment(this.message.sentAt).format("LT");
    },
    classes() {
      let classes = "message";
      if (this.message.sender._id === this.$store.getters.user._id) {
        classes += " message--user";
      } else {
        classes += " message--correspondent";
      }
      return classes;
    },
  },
};
</script>

<style lang="scss">
.message {
  display: flex;
  align-items: center;
  font-size: 1.3rem;

  * {
    margin: 0;
  }

  &--user {
    flex-direction: row-reverse;
  }

  &--correspondent {
    flex-direction: row;
  }

  &:not(:first-child) {
    margin-top: 0.3rem;
  }

  &--user + &--correspondent,
  &--correspondent + &--user {
    margin-top: 1.3rem;
  }

  &__content {
    max-width: 80%;
    border-radius: 1rem;
    padding: 0.8rem 1rem 0.6rem;
    position: relative;
    word-wrap: break-word;

    @media only screen and (min-width: 900px) {
      max-width: 70%;
    }
  }

  &--user &__content {
    background-color: #93cff7;
    color: #000;
    margin-left: 1rem;
  }

  &--correspondent &__content {
    background-color: #1520a6;
    color: #fff;
    margin-right: 1rem;
  }

  &__time {
    font-size: 0.8rem;
  }
}
</style>
