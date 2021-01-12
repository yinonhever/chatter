<template>
  <BaseButton link="/edit-profile" class="edit-button">
    <i class="far fa-edit" />
    <span>Edit Profile</span>
  </BaseButton>
</template>

<style lang="scss">
.button.edit-button {
  background-color: #1520a6;
  display: flex;
  align-items: center;
  padding-left: 1.8rem;
  padding-right: 1.8rem;

  &:hover {
    background-color: #fff;
    color: #1520a6;
  }

  i {
    margin-right: 1rem;
    font-size: 1.8rem;
  }
}
</style>
