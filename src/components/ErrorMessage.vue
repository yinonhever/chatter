<template>
  <p class="error fade-from-right">
    {{ message }}
  </p>
</template>

<script>
export default {
  props: {
    error: [Error, String],
  },
  computed: {
    message() {
      if (typeof this.error === "string") {
        return this.error;
      } else {
        const { data } = this.error.response || {};
        const { message } = data || {};
        return message || "An error occured. Please try again in a moment.";
      }
    },
  },
};
</script>

<style lang="scss">
.error {
  color: #dc3545;
  font-weight: 500;
  font-size: 1.5rem;
  text-align: center;
  padding: 0 4vw;
}

.auth + .error {
  margin-top: 3rem;
}

.profile-form + .error {
  margin-top: 4rem;
}

.page-heading + .error {
  margin-top: 8rem;
}
</style>
