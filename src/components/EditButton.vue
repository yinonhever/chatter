<template>
  <BaseButton link="/edit-profile" class="edit-button">
    <i class="far fa-edit" />
    <span>Edit Profile</span>
  </BaseButton>
</template>

<style lang="scss">
.edit-button {
  background-color: #1520a6;
  display: flex;
  align-items: center;
  padding-left: 2rem;
  padding-right: 2rem;

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
