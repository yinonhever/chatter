<template>
  <div :class="classes">
    <input
      class="search__input"
      :placeholder="placeholder"
      aria-label="Search users"
      :value="query"
      @input="changeHandler"
      @focus="focused = true"
      @blur="focused = false"
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
      focused: false,
      placeholder: "",
    };
  },
  computed: {
    classes() {
      let classes = "search";
      if (this.focused) {
        classes += " search--focused";
      }
      return classes;
    },
  },
  methods: {
    changeHandler(event) {
      this.query = event.target.value;
      this.$emit("search", this.query);
    },
    setPlaceholder() {
      this.placeholder =
        window.innerWidth > 500
          ? "Search by name, location, profession, bio..."
          : "Search users...";
    },
  },
  created() {
    this.setPlaceholder();
    window.addEventListener("resize", this.setPlaceholder);
  },
};
</script>

<style lang="scss">
.search {
  margin: 0 auto 5rem;
  max-width: 42rem;
  background-color: #fff;
  border-radius: 100px;
  box-shadow: rgba(62, 57, 107, 0.3) 0px 6px 16px 0px;
  padding: 0 3rem;
  display: flex;
  align-items: center;
  transition: all 0.2s;

  &--focused {
    max-width: 60rem;
  }

  &__input {
    font: inherit;
    font-size: 1.45rem;
    padding: 2rem 0;
    border: none;
    outline: none;
    flex: 1;
    width: 100%;
    margin-right: 1rem;
  }

  &__icon {
    font-size: 1.5rem;
  }
}
</style>
