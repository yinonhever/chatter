<template>
  <div class="chat__header">
    <RouterLink class="chat__user" :to="`/profile/${user._id}`">
      <img class="chat__avatar" :src="user.avatar" :alt="user.name" />
      <h2 class="chat__username">{{ user.name }}</h2>
    </RouterLink>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.chat {
  &__header {
    background: linear-gradient(to right, #007bff, #1520a6);
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
}
</style>
