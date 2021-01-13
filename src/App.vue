<template>
  <TheHeader />
  <RouterView v-slot="{ Component }">
    <Transition name="page" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<script>
import TheHeader from "./components/TheHeader";
import Scrollbar from "smooth-scrollbar";

export default {
  components: { TheHeader },
  created() {
    this.$store.dispatch("tryAutoLogin");
    Scrollbar.init(document.querySelector("#app"), { alwaysShowTracks: true });
  },
};
</script>

<style lang="scss">
*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;

  @media only screen and (min-width: 500px) {
    font-size: 75%;
  }
}

body {
  font-family: "Montserrat", sans-serif;
  font-size: 1.4rem;
  background-image: url(./assets/white-background-abstract-shapes.jpg);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
}

#app {
  padding: 2rem 4vw 6rem;
  overflow: hidden;
  position: relative;

  @media only screen and (min-width: 1150px) {
    padding: 3rem 9vw 6rem;
  }
}

h2,
h3 {
  font-family: "Montserrat Alternates", sans-serif;
  font-weight: 600;
}

a {
  &,
  &:hover {
    text-decoration: none;
    color: inherit;
  }
}

.hide-desktop {
  @media only screen and (min-width: 901px) {
    display: none;
  }
}

.hide-mobile {
  @media only screen and (max-width: 900px) {
    display: none;
  }
}

.zoom-in {
  animation: zoomIn 0.5s;
}

@keyframes zoomIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.page-enter-active {
  transition: opacity 0.35s ease-out;
}

.page-leave-active {
  transition: opacity 0.35s ease-in;
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
}
</style>
