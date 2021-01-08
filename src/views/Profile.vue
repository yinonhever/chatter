<template>
  <Page :title="title">
    <Spinner v-if="loading" />
    <ErrorMessage v-else-if="error" :error="error" />
    <div v-else>
      <p v-for="detail in details" :key="detail.key">{{ detail.content }}</p>
    </div>
  </Page>
</template>

<script>
import axios from "axios";

export default {
  props: {
    userId: String,
  },
  data() {
    return {
      userData: {},
      loading: true,
      error: null,
    };
  },
  computed: {
    isCurrentUser() {
      return this.userId === this.$store.getters.user._id;
    },
    title() {
      return this.isCurrentUser ? "My Profile" : "User Profile";
    },
    details() {
      const details = [];
      for (let key in this.userData) {
        details.push({ key: key, content: this.userData[key] });
      }
      console.log(details);
      return details;
    },
  },
  methods: {
    async loadDetails() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${this.userId}`
        );
        this.userData = response.data;
      } catch (error) {
        this.error = error;
      }
      this.loading = false;
    },
  },
  created() {
    this.loadDetails();
  },
};
</script>
