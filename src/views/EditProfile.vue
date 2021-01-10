<template>
  <Page title="Edit Profile">
    <Spinner v-if="loading" />
    <ErrorMessage v-else-if="errorLoading" :error="errorLoading" />
    <form v-else class="profile-form" @submit.prevent="submitHandler">
      <div class="profile-form__field">
        <label for="name" class="profile-form__label">Name</label>
        <input
          v-model="formData.name"
          id="name"
          placeholder="Your name..."
          required
          class="profile-form__input"
        />
      </div>
      <div class="profile-form__field">
        <label for="email" class="profile-form__label">
          Email (used for login)
        </label>
        <input
          v-model="formData.email"
          id="email"
          placeholder="Your email..."
          type="email"
          required
          class="profile-form__input"
        />
        <p class="profile-form__note">
          This site uses
          <ExternalLink to="https://en.gravatar.com/">Gravatar</ExternalLink>
          to generate a profile image
        </p>
      </div>
      <div class="profile-form__field">
        <label for="birthday" class="profile-form__label">Birthday</label>
        <DatePicker
          v-model="formData.birthday"
          id="birthday"
          class="profile-form__input"
        />
      </div>
      <div class="profile-form__field">
        <label for="location" class="profile-form__label">Location</label>
        <input
          v-model="formData.location"
          id="location"
          placeholder="Your location (city, country)..."
          class="profile-form__input"
        />
      </div>
      <div class="profile-form__field">
        <label for="profession" class="profile-form__label">Profession</label>
        <input
          v-model="formData.profession"
          id="profession"
          placeholder="Your profession..."
          class="profile-form__input"
        />
      </div>
      <div class="profile-form__field">
        <label for="bio" class="profile-form__label">Bio</label>
        <textarea
          v-model="formData.bio"
          id="bio"
          placeholder="Tell us a bit about yourself..."
          class="profile-form__input profile-form__textarea"
        />
      </div>
      <BaseButton>Save Profile</BaseButton>
    </form>
    <Spinner v-if="submitting" />
    <ErrorMessage v-else-if="errorSubmitting" :error="errorSubmitting" />
  </Page>
</template>

<script>
import axios from "axios";
import DatePicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  components: { DatePicker },
  data() {
    return {
      formData: {
        name: "",
        email: "",
        birthday: new Date(),
        profession: "",
        location: "",
        bio: "",
      },
      loading: true,
      errorLoading: null,
      submitting: false,
      errorSubmitting: false,
    };
  },
  computed: {
    redirect() {
      return this.$route.query.new === "true" ? "/explore" : "/profile";
    },
  },
  methods: {
    async loadDetails() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${this.$store.getters.user._id}`,
          { headers: { Authorization: this.$store.getters.token } }
        );
        for (let key in this.formData) {
          if (response.data[key]) {
            this.formData[key] = response.data[key];
          }
        }
      } catch (error) {
        this.errorLoading = error;
      }
      this.loading = false;
    },
    async submitHandler() {
      this.submitting = true;
      try {
        await axios.put(
          `http://localhost:5000/api/users/${this.$store.getters.user._id}`,
          this.formData,
          { headers: { Authorization: this.$store.getters.token } }
        );
        this.$store.dispatch("updateUser", this.formData);
        this.$router.push(this.redirect);
      } catch (error) {
        this.errorSubmitting = error;
        this.submitting = false;
      }
    },
  },
  created() {
    this.loadDetails();
  },
};
</script>

<style lang="scss">
.profile-form {
  display: flex;
  flex-direction: column;
  max-width: 55rem;
  margin: auto;

  * {
    margin: 0;
  }

  &__field {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.7rem;
  }

  &__label {
    font-weight: 500;
    font-size: 1.55rem;
    margin-bottom: 0.5rem;
  }

  &__input {
    font: inherit;
    padding: 1.2rem 1rem;
    border: 2px solid transparent;
    outline: none;
    border-radius: 0.8rem;
    transition: all 0.4s;
    box-shadow: rgba(62, 57, 107, 0.3) 0px 6px 16px 0px;

    &:focus {
      border-color: #007bff;
    }
  }

  &__textarea {
    resize: none;
    height: 12rem;
  }

  &__note {
    font-size: 1.3rem;
    margin-top: 0.7rem;
  }

  .button {
    font-size: 1.35rem;
    margin-top: 1.5rem;
  }
}

.flatpickr-calendar {
  padding-bottom: 0.4rem;
  box-shadow: rgba(62, 57, 107, 0.36) 0px 16px 38px -12px,
    rgba(62, 57, 107, 0.12) 0px 4px 25px 0px,
    rgba(62, 57, 107, 0.2) 0px 8px 10px -5px;
}

.flatpickr-day {
  transition: all 0.4s;

  &.selected {
    &,
    &:hover {
      background: #007bff;
      border-color: #007bff;
    }
  }
}
</style>
