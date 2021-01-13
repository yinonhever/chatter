<template>
  <header :class="classes">
    <RouterLink to="/">
      <h1 class="header__logo" @click="closeNav">Chatter</h1>
    </RouterLink>
    <NavToggle @click="toggleNav" />
    <nav class="header__navigation">
      <NavItem v-if="!isAuth" link="/login">Login</NavItem>
      <NavItem v-if="!isAuth" link="/signup">Signup</NavItem>
      <NavItem v-if="isAuth" class="hide-desktop" link="/explore">
        Explore
      </NavItem>
      <GreetingBox v-if="isAuth" />
      <NavItem v-if="isAuth" link="/chats">My Chats</NavItem>
      <NavItem v-if="isAuth" @click="logout">Logout</NavItem>
    </nav>
  </header>
</template>

<script>
import NavToggle from "./NavToggle";
import NavItem from "./NavItem";
import GreetingBox from "./GreetingBox";

export default {
  components: { NavToggle, NavItem, GreetingBox },
  data() {
    return {
      navOpen: false,
    };
  },
  computed: {
    classes() {
      let classes = "header";
      if (this.navOpen) classes += " active";
      return classes;
    },
    isAuth() {
      return this.$store.getters.isAuth;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    toggleNav() {
      this.navOpen = !this.navOpen;
    },
    closeNav() {
      this.navOpen = false;
    },
  },
  provide() {
    return {
      closeNav: this.closeNav,
    };
  },
  watch: {
    navOpen(value) {
      if (value) {
        document.querySelector("body").style.overflow = "hidden";
      } else {
        document.querySelector("body").style.overflow = null;
      }
    },
  },
  created() {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900 && this.navOpen) {
        this.closeNav();
      }
    });
  },
};
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 4rem;
  position: relative;
  z-index: 999;

  &__logo {
    display: inline-block;
    font-size: 4.8rem;
    font-family: "Monofett", cursive;
    color: #1520a6;
    margin-bottom: 0.8rem;
    transition: color 0.5s;

    @media only screen and (max-width: 500px) {
      font-size: 4.1rem;
    }
  }

  &__navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 195px;
  }

  &__nav-item {
    list-style: none;
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

  @media only screen and (max-width: 900px) {
    &.active {
      color: #fff;
    }

    &::after {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(#1520a6, 0.95);
      opacity: 0;
      visibility: hidden;
      transition: all 0.5s;
      z-index: -1;
    }

    &.active::after {
      opacity: 1;
      visibility: visible;
    }

    &.active &__logo {
      color: #fff;
    }

    &__navigation {
      position: absolute;
      top: 45vh;
      left: 50%;
      transform: translate(-50%, -50%);
      flex-direction: column;
      align-items: center;
      text-align: center;
      opacity: 0;
      visibility: hidden;
      transition: all 0.5s;
    }

    &.active &__navigation {
      opacity: 1;
      visibility: visible;
    }

    &__nav-item {
      color: #fff;
      opacity: 0;
      transform: translateX(-50vw);
      transition: all 0.5s;

      &:not(:last-child) {
        margin-right: 0;
        margin-bottom: 3.5rem;
      }

      .button {
        color: #fff;
        font-size: 2rem;
      }
    }

    &.active &__nav-item {
      opacity: 1;
      transform: translateX(0);
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
