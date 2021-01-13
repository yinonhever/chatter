<template>
  <span class="header__nav-toggle"> <span /><span /><span /> </span>
</template>

<style lang="scss">
.header {
  &__nav-toggle {
    display: none;
  }

  @media only screen and (max-width: 900px) {
    &__nav-toggle {
      display: block;
      height: 20px;
      width: 24px;
      position: relative;

      span {
        display: block;
        position: absolute;
        height: 4px;
        width: 24px;
        background-color: #000;
        transition: all 0.5s;

        &:nth-child(1) {
          top: 0;
        }

        &:nth-child(2) {
          top: 50%;
          transform: translateY(-50%);
          transition: all 0.6s;
        }

        &:nth-child(3) {
          bottom: 0;
        }
      }
    }

    &.active &__nav-toggle span {
      background-color: #fff;

      &:nth-child(1) {
        top: 50%;
        transform: translateY(-50%) rotate(135deg);
      }

      &:nth-child(2) {
        transform: translate(20rem, -50%);
      }

      &:nth-child(3) {
        bottom: 50%;
        transform: translateY(50%) rotate(-135deg);
      }
    }
  }
}
</style>
