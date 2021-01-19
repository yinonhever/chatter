<template>
  <Profile :userId="userId" />
</template>

<script>
import Profile from "./Profile";

export default {
  components: { Profile },
  computed: {
    userId() {
      const { _id } = this.$store.getters.user || {};
      return _id;
    },
  },
};
</script>
