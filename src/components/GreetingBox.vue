<template>
  <NavItem link="/profile" class="greeting-box">
    <img class="greeting-box__img" :src="user.avatar" :alt="user.name" />
    <span class="greeting-box__text hide-mobile">Hello, {{ name }}</span>
    <span class="greeting-box__text hide-desktop">Profile</span>
  </NavItem>
</template>

<script>
import NavItem from "./NavItem";

export default {
  components: { NavItem },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    name() {
      return this.user.name.split(" ")[0];
    },
  },
};
</script>

<style lang="scss">
.header .greeting-box {
  background-color: #1520a6;
  border-radius: 0.4rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  transition: all 0.5s;

  &:hover {
    background-color: #007bff;
  }

  @media only screen and (max-width: 900px) {
    &,
    &:hover {
      background-color: transparent;
    }
  }

  &__img {
    height: 3rem;

    @media only screen and (max-width: 900px) {
      display: none;
    }
  }

  &__text {
    padding: 0 1rem;
    text-transform: initial;
    font-size: 1.45rem;

    &,
    &:hover {
      color: #fff;
    }

    @media only screen and (max-width: 900px) {
      text-transform: uppercase;
      font-size: 1.35rem;
    }
  }
}
</style>
