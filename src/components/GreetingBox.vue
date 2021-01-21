<template>
  <NavItem link="/profile" class="greeting-box">
    <img class="greeting-box__img" :src="user.avatar" :alt="user.name" />
    <span class="greeting-box__text">Hello, {{ name }}</span>
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
  transition: all 0.5s;

  &:hover {
    background-color: #007bff;
  }

  @media only screen and (max-width: 900px) {
    &,
    &:hover {
      background-color: transparent;
      border-radius: initial;
      margin-bottom: 5.5rem !important;
      transform: translateX(50vw);
    }
  }

  a {
    display: flex;
    align-items: center;

    @media only screen and (max-width: 900px) {
      flex-direction: column;
    }
  }

  &__img {
    height: 3rem;
    width: 3rem;

    @media only screen and (max-width: 900px) {
      height: 5rem;
      width: 5rem;
      border-radius: 50%;
      margin-bottom: 1rem;
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
      font-weight: 600;
      font-size: 2.1rem;
    }
  }
}
</style>
