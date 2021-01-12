<template>
  <div :class="classes">
    <div class="message__content">
      <p class="message__text">{{ message.content }}</p>
      <div class="message__bottom">
        <span class="message__time">{{ time }}</span>
        <i
          v-if="isCurrentUser"
          class="message__delete fas fa-times"
          @click="$emit('delete', message._id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  emits: ["delete"],
  props: {
    message: Object,
  },
  data() {
    return {
      showDropdown: false,
    };
  },
  computed: {
    isCurrentUser() {
      return this.message.sender._id === this.$store.getters.user._id;
    },
    time() {
      return moment(this.message.sentAt).format("LT");
    },
    classes() {
      let classes = "message";
      if (this.isCurrentUser) {
        classes += " message--user";
      } else {
        classes += " message--correspondent";
      }
      return classes;
    },
  },
  watch: {
    showDropdown(value) {
      console.log(value);
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
    margin-top: 0.2rem;
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
  }

  &--correspondent &__content {
    background-color: #1520a6;
    color: #fff;
  }

  &__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.6rem;

    @media only screen and (max-width: 500px) {
      margin-top: 1rem;
    }
  }

  &__time {
    font-size: 0.8rem;
  }

  &__delete {
    font-size: 0.9rem;
    margin-left: 0.5rem;
    visibility: hidden;
    opacity: 0;
    transition: all 0.4s;
    cursor: pointer;

    @media only screen and (max-width: 500px) {
      visibility: visible;
      opacity: 1;
    }

    &:hover {
      color: #1520a6;
    }
  }

  &__content:hover &__delete {
    visibility: visible;
    opacity: 1;
  }
}
</style>
