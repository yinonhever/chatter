<template>
  <div class="card zoom-in">
    <div class="card__top">
      <img class="card__img" :src="user.avatar" :alt="user.name" />
      <h3 class="card__name">{{ user.name }}</h3>
      <p v-if="user.location" class="card__location">
        {{ user.location }}
      </p>
    </div>
    <div class="card__bottom">
      <BaseButton :link="`/profile/${user._id}`">View Profile</BaseButton>
      <BaseButton :link="`/chats/${user._id}`">Send Message</BaseButton>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
  },
};
</script>

<style lang="scss">
.card {
  background-color: #fff;
  border-radius: 0.8rem;
  box-shadow: rgba(62, 57, 107, 0.3) 0px 6px 16px 0px;
  padding: 2.75rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  word-wrap: break-word;

  * {
    margin: 0;
  }

  &__top {
    margin-bottom: 2rem;
  }

  &__img {
    width: 16.66rem;
    border-radius: 50%;
    margin-bottom: 1.7rem;
  }

  &__name {
    font-size: 2.4rem;
    font-weight: 700;
    margin-bottom: 0.6rem;
  }

  &__location {
    font-size: 1.5rem;
  }

  .button {
    font-size: 1.3rem;

    &:first-child {
      background-color: #1520a6;

      &:hover {
        background-color: #fff;
        color: #1520a6;
      }
    }
  }
}
</style>
