<template>
  <div class="chat-list zoom-in">
    <ChatListItem v-for="chat in chats" :key="chat._id" v-bind="chat" />
  </div>
</template>

<script>
import ChatListItem from "./ChatListItem";

export default {
  components: { ChatListItem },
  props: {
    chats: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.chat-list {
  max-width: 50rem;
  margin: 0 auto;
  border-radius: 0.8rem;
  background-color: rgba(#fff, 0.8);
  box-shadow: rgba(62, 57, 107, 0.36) 0px 16px 38px -12px,
    rgba(62, 57, 107, 0.12) 0px 4px 25px 0px,
    rgba(62, 57, 107, 0.2) 0px 8px 10px -5px;
  overflow: hidden;
}
</style>
