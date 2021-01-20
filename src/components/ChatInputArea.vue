<template>
  <div class="chat__bottom">
    <form class="chat__form" @submit.prevent="submitHandler">
      <input
        v-model.trim="input"
        class="chat__input"
        placeholder="Type a message..."
        aria-label="Type a message"
      />
      <div class="chat__submit">
        <i v-if="sending" class="chat__spinner fas fa-spinner fa-spin" />
        <BaseButton v-else>
          <i class="chat__icon far fa-paper-plane" />
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    sending: Boolean,
  },
  inject: ["sendMessage"],
  data() {
    return {
      input: "",
    };
  },
  methods: {
    async submitHandler() {
      if (!this.input) return;
      const success = await this.sendMessage(this.input);
      if (success) this.input = "";
    },
  },
};
</script>

<style lang="scss">
.chat {
  &__bottom {
    background-color: #cde4fd;
    padding: 1rem 2rem;

    @media only screen and (max-width: 500px) {
      padding: 1rem;
    }
  }

  &__form {
    display: flex;
    align-items: center;
  }

  &__input {
    flex: 1;
    border-radius: 100px;
    margin-right: 1rem;
    border: 2px solid transparent;
    outline: none;
    padding: 1rem 2rem;
    transition: all 0.5s;

    &:focus {
      border-color: #007bff;
    }
  }

  &__submit {
    width: 4.3rem;
    height: 4.3rem;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button {
    margin: 0;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    position: relative;
    font-size: 1.6rem;
  }

  &__icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &__spinner {
    font-size: 2rem;
    color: #007bff;
  }
}
</style>
