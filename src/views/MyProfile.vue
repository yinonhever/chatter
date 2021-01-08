<template>
  <Profile :userId="$store.getters.user._id" />
</template>

<script>
import Profile from "./Profile";

export default {
  components: { Profile },
};
</script>
