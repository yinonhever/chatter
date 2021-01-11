<template>
  <form class="form zoom-in" @submit.prevent="submitHandler">
    <input
      v-if="mode === 'signup'"
      v-model.trim="formData.name"
      required
      placeholder="Name"
      class="form__input"
    />
    <input
      v-model.trim="formData.email"
      type="email"
      required
      placeholder="Email Address"
      class="form__input"
    />
    <input
      v-model.trim="formData.password"
      type="password"
      required
      placeholder="Password"
      class="form__input"
    />
    <input
      v-if="mode === 'signup'"
      v-model.trim="formData.confirmPassword"
      type="password"
      required
      placeholder="Confirm Password"
      class="form__input"
    />
    <BaseButton>{{ buttonText }}</BaseButton>
  </form>
  <Spinner v-if="loading" />
  <ErrorMessage v-else-if="error" :error="error" />
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      loading: false,
      error: null,
    };
  },
  computed: {
    buttonText() {
      return this.mode === "signup" ? "Register" : "Login";
    },
    redirect() {
      return this.mode === "signup" ? "/edit-profile?new=true" : "/explore";
    },
  },
  methods: {
    async submitHandler() {
      const { name, email, password, confirmPassword } = this.formData;
      if (this.mode === "signup" && password !== confirmPassword) {
        this.error = "Passwords do not match";
        return;
      }
      try {
        this.loading = true;
        await this.$store.dispatch("auth", {
          mode: this.mode,
          data: { name, email, password },
        });
        this.$router.replace(this.redirect);
      } catch (error) {
        this.error = error;
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss">
.form {
  display: flex;
  flex-direction: column;
  max-width: 42rem;
  margin: auto;
  background-color: #fff;
  padding: 3rem 2rem;
  border-radius: 0.8rem;
  box-shadow: rgba(62, 57, 107, 0.36) 0px 16px 38px -12px,
    rgba(62, 57, 107, 0.12) 0px 4px 25px 0px,
    rgba(62, 57, 107, 0.2) 0px 8px 10px -5px;

  @media only screen and (min-width: 500px) {
    padding: 3rem;
  }

  &__input {
    font: inherit;
    font-size: 1.5rem;
    padding: 1rem;
    outline: none;
    border: none;
    border-bottom: 2px solid #ccc;
    text-align: center;
    margin-bottom: 1.5rem;
    transition: all 0.4s;

    &:focus {
      border-color: #007bff;
    }

    &::placeholder {
      color: rgba(#000, 0.5);
    }
  }

  .button {
    margin-top: 1rem;
  }
}
</style>
