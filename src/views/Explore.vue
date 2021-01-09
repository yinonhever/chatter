<template>
  <Page title="Explore">
    <Spinner v-if="loading" />
    <ErrorMessage v-else-if="error" :error="error" />
    <section v-else class="explore">
      <SearchBox @search="filterUsers" />
      <div class="explore__grid">
        <ExploreCard
          v-for="user in filteredUsers.slice(0, 6)"
          :key="user._id"
          :user="user"
        />
      </div>
    </section>
  </Page>
</template>

<script>
import axios from "axios";
import SearchBox from "../components/SearchBox";
import ExploreCard from "../components/ExploreCard";

export default {
  components: { SearchBox, ExploreCard },
  data() {
    return {
      users: [],
      filteredUsers: [],
      loading: true,
      error: null,
    };
  },
  methods: {
    async loadUsers() {
      try {
        const response = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: this.$store.getters.token },
        });
        this.users = response.data;
        this.filteredUsers = response.data;
      } catch (error) {
        this.error = error;
      }
      this.loading = false;
    },
    filterUsers(query) {
      const keys = ["name", "profession", "email", "bio"];
      this.filteredUsers = this.users.filter((user) => {
        for (let key of keys) {
          if (
            user[key] &&
            user[key].toLowerCase().includes(query.toLowerCase())
          ) {
            return true;
          }
        }
        return false;
      });
    },
  },
  created() {
    this.loadUsers();
  },
};
</script>

<style lang="scss">
.explore {
  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2.5rem;
  }
}
</style>
