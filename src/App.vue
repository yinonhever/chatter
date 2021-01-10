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
import axios from "axios";

export default {
  components: { TheHeader },
  methods: {
    async loadUsers() {
      const { data } = await axios.get("https://randomuser.me/api/");
      const fetchedUser = data.results[0];
      const createdUser = {
        name: fetchedUser.name.first + " " + fetchedUser.name.last,
        email: fetchedUser.email,
        password: fetchedUser.login.password,
        location:
          fetchedUser.location.city + ", " + fetchedUser.location.country,
        birthday: new Date(fetchedUser.dob.date),
        phone: fetchedUser.cell,
        avatar: fetchedUser.picture.large,
      };
      await axios.post("http://localhost:5000/api/users/insert", [createdUser]);
      console.log(createdUser);
    },
  },
  created() {
    this.$store.dispatch("tryAutoLogin");
    // this.loadUsers();
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@400;500;600;700;800;900&family=Montserrat:wght@400;500;600;700;800;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Monofett&display=swap");

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
  padding: 2.5rem 4vw 6rem;
  overflow: hidden;
  position: relative;

  @media only screen and (min-width: 1100px) {
    padding: 3rem 9vw 6rem;
  }
}

h2,
h3,
h4 {
  font-family: "Montserrat Alternates", sans-serif;
}

a {
  &,
  &:hover {
    text-decoration: none;
    color: inherit;
  }
}

.fade-from-left {
  animation: fadeFromLeft 0.5s ease-out;
}

.fade-from-right {
  animation: fadeFromRight 0.5s ease-out;
}

@keyframes fadeFromLeft {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fadeFromRight {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
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
