<template>
  <div :class="classes">
    <div class="message__content">
      <p v-if="message.story_share" class="message__share">
        {{ message.story_share }}
      </p>
      <a
        v-if="message.link && message.text"
        :href="message.link"
        class="message__link"
      >
        {{ message.text }}
      </a>
      <p v-else-if="message.text" class="message__text">
        {{ message.text }}
      </p>
      <p v-else-if="!message.story_share" class="message__not-found">
        - Media unavailable -
      </p>
    </div>
    <p class="message__time">{{ time }}</p>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    message: Object,
  },
  computed: {
    senderName() {
      if (
        this.message.sender === "acc.on.break" ||
        this.message.sender.includes("deleted")
      )
        return "Venni";
      else if (this.message.sender === "yh1can") return "Yinon";
      else return null;
    },
    time() {
      return moment(this.message.created_at).format("LT");
    },
    classes() {
      let classes = "message";
      if (this.senderName === "Yinon") {
        classes += " message--yinon";
      } else if (this.senderName === "Venni") {
        classes += " message--venni";
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

  &--yinon {
    flex-direction: row-reverse;
  }

  &--venni {
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

  &--yinon &__content {
    background-color: #93cff7;
    color: #000;
    margin-left: 1rem;
  }

  &--venni &__content {
    background-color: #1520a6;
    margin-right: 1rem;
  }

  &:not(:first-child) {
    margin-top: 0.3rem;
  }

  &--yinon + &--venni,
  &--venni + &--yinon {
    margin-top: 1.3rem;
  }

  &__link {
    transition: color 0.4s;

    &,
    &:hover {
      color: inherit;
      text-decoration: none;
    }

    &:hover {
      color: #ccc;
    }
  }

  &--yinon &__link:hover {
    color: #fff;
  }

  &__time {
    color: #000;
    font-size: 1rem;
  }

  &__share {
    font-size: 1rem;
    margin-bottom: 0.6rem;
  }

  &__not-found {
    font-size: 1rem;
  }
}
</style>
