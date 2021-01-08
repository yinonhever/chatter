<template>
  <div class="search">
    <input
      class="search__input"
      placeholder="Search by name, email, profession, bio..."
      aria-label="Search users"
      :value="query"
      @input="changeHandler"
    />
    <i class="search__icon fas fa-search" />
  </div>
</template>

<script>
export default {
  emits: ["search"],
  data() {
    return {
      query: "",
    };
  },
  methods: {
    changeHandler(event) {
      this.query = event.target.value;
      this.$emit("search", this.query);
    },
  },
};
</script>

<style lang="scss">
.search {
  margin: 0 auto 5rem;
  max-width: 60rem;
  background-color: #fff;
  border-radius: 100px;
  box-shadow: rgba(62, 57, 107, 0.3) 0px 6px 16px 0px;
  padding: 0 3rem;
  display: flex;
  align-items: center;

  &__input {
    font: inherit;
    font-size: 1.45rem;
    padding: 2rem 0;
    border: none;
    outline: none;
    flex: 1;
    margin-right: 1rem;
  }

  &__icon {
    font-size: 1.5rem;
  }
}
</style>
