<template>
  <Page :title="title">
    <Spinner v-if="loading" />
    <ErrorMessage v-else-if="error" :error="error" />
    <section v-else-if="user" class="profile">
      <img class="profile__avatar" :src="user.avatar" :alt="user.name" />
      <h3 class="profile__name">{{ user.name }}</h3>
      <div class="profile__seperator" />
      <div class="profile__field">
        <h4 class="profile__field-title">Email Address</h4>
        <ExternalLink
          class="profile__field-content"
          :to="`mailto:${user.email}`"
        >
          {{ user.email }}
        </ExternalLink>
      </div>
      <div v-if="user.birthday" class="profile__field">
        <h4 class="profile__field-title">Birthday</h4>
        <span class="profile__field-content">{{ birthday }}</span>
      </div>
      <div v-if="user.location" class="profile__field">
        <h4 class="profile__field-title">Location</h4>
        <span class="profile__field-content">{{ user.location }}</span>
      </div>
      <div v-if="user.profession" class="profile__field">
        <h4 class="profile__field-title">Profession</h4>
        <span class="profile__field-content">{{ user.profession }}</span>
      </div>
      <div v-if="user.bio" class="profile__bio">
        <h4 class="profile__field-title">Bio</h4>
        <p class="profile__field-content">{{ user.bio }}</p>
      </div>
      <EditButton v-if="isCurrentUser" />
      <BaseButton v-if="!isCurrentUser" :link="`/chats/${user._id}`">
        Send Message
      </BaseButton>
    </section>
  </Page>
</template>

<script>
import axios from "axios";
import moment from "moment";
import EditButton from "../components/EditButton";

export default {
  components: { EditButton },
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      user: null,
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
    birthday() {
      return moment(this.user.birthday).format("LL");
    },
  },
  methods: {
    async loadDetails() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${this.userId}`
        );
        this.user = response.data;
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

<style lang="scss">
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 50rem;
  margin: auto;
  background-color: rgba(#fff, 0.8);
  padding: 3rem;
  border-radius: 0.8rem;
  box-shadow: rgba(62, 57, 107, 0.36) 0px 16px 38px -12px,
    rgba(62, 57, 107, 0.12) 0px 4px 25px 0px,
    rgba(62, 57, 107, 0.2) 0px 8px 10px -5px;
  position: relative;
  overflow: auto;

  @media only screen and (max-width: 500px) {
    padding: 3rem 2rem;
  }

  * {
    margin: 0;
  }

  &__avatar {
    width: 100%;
    max-width: 25rem;
    border-radius: 50%;
    margin-bottom: 2rem;
  }

  &__name {
    font-size: 2.7rem;
    font-weight: 600;
  }

  &__seperator {
    width: 12rem;
    height: 0.45rem;
    background-color: #007bff;
    margin: 2rem 0 2.5rem;
  }

  &__field {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 1.6rem;
    }
  }

  &__field-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-right: 1.5rem;
  }

  &__field-content {
    font-size: 1.45rem;
    text-align: right;
    word-wrap: break-word;
  }

  &__bio {
    margin-top: 0.5rem;
  }

  &__bio &__field-title {
    margin-right: 0;
    margin-bottom: 0.5rem;
  }

  &__bio &__field-content {
    text-align: left;
  }

  .button {
    width: 100%;
    max-width: 20rem;
    font-size: 1.35rem;
    margin-top: 1rem;
  }

  .edit-button {
    width: auto;
    max-width: initial;
  }

  &__bio + .button {
    margin-top: 2rem;
  }
}
</style>
