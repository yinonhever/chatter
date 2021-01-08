<template>
  <NavLink to="/profile" class="greeting-box">
    <img class="greeting-box__img" :src="user.avatar" :alt="user.name" />
    <span class="greeting-box__text">Hello, {{ name }}</span>
  </NavLink>
</template>

<script>
import NavLink from "./NavLink";

export default {
  components: { NavLink },
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

  &:hover,
  &.active {
    background-color: #007bff;
  }

  &__img {
    height: 3rem;
  }

  &__text {
    color: #fff;
    padding: 0 1rem;
    text-transform: initial;
    font-size: 1.45rem;
  }
}
</style>
