<template>
  <header class="header">
    <RouterLink to="/">
      <h1 class="header__logo">Chatter</h1>
    </RouterLink>
    <nav class="header__navigation">
      <NavItem v-if="!isAuth" link="/login">Login</NavItem>
      <NavItem v-if="!isAuth" link="/signup">Signup</NavItem>
      <GreetingBox v-if="isAuth" />
      <NavItem v-if="isAuth" link="/chats">My Chats</NavItem>
      <NavItem v-if="isAuth" @click="logout">Logout</NavItem>
    </nav>
  </header>
</template>

<script>
import NavItem from "./NavItem";
import GreetingBox from "./GreetingBox";

export default {
  components: { NavItem, GreetingBox },
  data() {
    return {
      navOpen: false,
    };
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 4rem;

  &__logo {
    display: inline-block;
    font-size: 4.8rem;
    font-family: "Monofett", cursive;
    color: #1520a6;
    margin-bottom: 0.8rem;

    @media only screen and (max-width: 500px) {
      font-size: 4.1rem;
    }
  }

  &__navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 195px;

    @media only screen and (max-width: 900px) {
      display: none;
    }
  }

  &__nav-link {
    text-transform: uppercase;
    font-size: 1.35rem;
    letter-spacing: 1px;
    font-weight: 500;
    transition: color 0.5s;
    cursor: pointer;
    animation: fadeIn 0.5s ease-out;

    &:hover,
    &.active {
      color: #007bff;
    }

    &:not(:last-child) {
      margin-right: 4rem;

      @media only screen and (max-width: 1100px) {
        margin-right: 3rem;
      }
    }
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
