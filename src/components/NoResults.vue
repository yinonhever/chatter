<template>
  <div class="no-results zoom-in">
    <i class="no-results__icon fas fa-search-minus"></i>
    <p class="no-results__text">
      No matching results were found.
    </p>
  </div>
</template>

<style lang="scss">
.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 2rem;

  &__icon {
    font-size: 6rem;
    margin-bottom: 2rem;
  }

  &__text {
    font-size: 1.6rem;
    line-height: 1.7;
    margin-bottom: 2rem;

    @media only screen and (max-width: 900px) {
      margin-bottom: 1.5rem;
    }
  }

  .button {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>
