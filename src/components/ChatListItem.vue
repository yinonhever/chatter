<template>
  <RouterLink :class="classes" :to="`/chats/${correspondent._id}`">
    <img
      class="chat-item__avatar"
      :src="correspondent.avatar"
      :alt="correspondent.name"
    />
    <div class="chat-item__content">
      <div class="chat-item__top">
        <span class="chat-item__username">{{ correspondent.name }}</span>
        <span class="chat-item__time">{{ time }}</span>
      </div>
      <p class="chat-item__message">{{ message }}</p>
      <span v-if="unreadMessages" class="chat-item__count">
        {{ unreadMessages }}
      </span>
    </div>
  </RouterLink>
</template>

<script>
import moment from "moment";

export default {
  props: {
    correspondent: Object,
    lastMessage: Object,
    unreadMessages: Number,
  },
  computed: {
    time() {
      const { sentAt } = this.lastMessage;
      if (moment(sentAt).format("L") === moment().format("L")) {
        return moment(sentAt).format("LT");
      } else {
        return moment(sentAt).format("L");
      }
    },
    message() {
      const { content } = this.lastMessage;
      if (content.length <= 50) {
        return content;
      } else {
        return content.substr(1, 50) + "...";
      }
    },
    classes() {
      let classes = "chat-item";
      if (this.unreadMessages) classes += " chat-item--new";
      return classes;
    },
  },
};
</script>

<style lang="scss">
.chat-item {
  display: flex;
  align-items: stretch;
  padding: 0 2rem;
  transition: all 0.5s;

  @media only screen and (max-width: 500px) {
    padding: 0 1.5rem;
  }

  &:hover {
    background-color: rgba(#ccc, 0.6);
  }

  * {
    margin: 0;
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }

  &__avatar {
    width: 5rem;
    border-radius: 50%;
    margin: 1.5rem 1.5rem 1.5rem 0;

    @media only screen and (max-width: 500px) {
      width: 4rem;
      margin-right: 1rem;
    }
  }

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &--new &__top {
    align-items: flex-start;
  }

  &__username {
    font-weight: 500;
    font-size: 1.5rem;
  }

  &__time {
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  &__message {
    font-size: 1.2rem;
    margin-top: 0.1rem;
  }

  &:not(:last-child) &__content::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: rgba(#ccc, 0.6);
  }

  &--new * {
    font-weight: 700;
  }

  &__count {
    position: absolute;
    right: 0;
    bottom: 1rem;
    background-color: #007bff;
    color: #fff;
    width: 3rem;
    height: 3rem;
    font-size: 1.25rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media only screen and (max-width: 500px) {
      transform: none;
      top: initial;
      width: 2.5rem;
      height: 2.5rem;
      font-size: 1.1rem;
    }
  }
}
</style>
