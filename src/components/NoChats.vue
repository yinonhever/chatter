<template>
  <div class="no-chats zoom-in">
    <i class="no-chats__icon far fa-comments" />
    <p class="no-chats__text">
      You don't have any chats yet. Start your first.
    </p>
    <BaseButton link="/explore">Explore Users</BaseButton>
  </div>
</template>

<style lang="scss">
.no-chats {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 2rem;

  &__icon {
    font-size: 6rem;
    margin-bottom: 2rem;
  }

  &__text {
    font-size: 1.6rem;
    line-height: 1.7;
    margin-bottom: 2rem;

    @media only screen and (max-width: 900px) {
      margin-bottom: 1.5rem;
    }
  }

  .button {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>
