<template>
  <div :class="classes">
    <p class="message__content">
      {{ message.content }}
    </p>
    <span class="message__time">{{ time }}</span>
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
  color: #fff;

  * {
    margin: 0;
  }

  &--user {
    flex-direction: row-reverse;
  }

  &--correspondent {
    flex-direction: row;
  }

  &__content {
    max-width: 80%;
    border-radius: 1rem;
    padding: 1rem;
    position: relative;
    word-wrap: break-word;

    @media only screen and (min-width: 900px) {
      max-width: 50rem;
    }
  }

  &--user &__content {
    background-color: #93cff7;
    color: #000;
    margin-left: 1rem;
  }

  &--correspondent &__content {
    background-color: #1520a6;
    margin-right: 1rem;
  }

  &:not(:first-child) {
    margin-top: 0.3rem;
  }

  &--user + &--correspondent,
  &--correspondent + &--user {
    margin-top: 1.3rem;
  }

  &__time {
    color: #000;
    font-size: 1rem;
  }
}
</style>
