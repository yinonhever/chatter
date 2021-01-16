<template>
  <main class="chat__main" ref="container">
    <div v-if="!dates.length" class="chat__empty">
      <i class="far fa-comments" />
      <p>Start a chat by typing a message below.</p>
    </div>
    <TransitionGroup v-else tag="div" class="chat__timeline" name="messages">
      <ChatDate
        v-for="dateItem in dates"
        :key="dateItem.date"
        v-bind="dateItem"
      />
    </TransitionGroup>
  </main>
</template>

<script>
import Scrollbar from "smooth-scrollbar";
import ChatDate from "./ChatDate";

export default {
  components: { ChatDate },
  props: {
    dates: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      scrollbar: null,
    };
  },
  mounted() {
    const { container } = this.$refs;
    this.scrollbar = Scrollbar.init(container);
    this.scrollbar.scrollTop = container.scrollHeight;
  },
  provide() {
    return {
      getScrollbar: () => this.scrollbar,
    };
  },
};
</script>

<style lang="scss">
.chat {
  &__main {
    height: 50rem;
    overflow: auto;
    background-color: rgba(#fff, 0.6);
    position: relative;

    .scroll-content {
      min-height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    text-align: center;
    padding: 2rem;

    i {
      font-size: 6rem;
      margin-bottom: 2rem;
    }

    p {
      font-size: 1.6rem;
    }
  }

  &__timeline {
    padding: 2.5rem 2rem;
    width: 100%;
    min-height: 100%;
    position: relative;
    align-self: flex-start;

    @media only screen and (max-width: 500px) {
      padding: 2rem 0.8rem;
    }
  }
}

.messages-leave-to,
.messages-enter-from {
  opacity: 0;
  transform: scale(0);
}

.messages-leave-from,
.messages-enter-to {
  opacity: 1;
  transform: scale(1);
}

.messages-leave-active,
.messages-enter-active {
  transition: all 0.5s;
}

.messages-leave-active:not(.date-section) {
  position: absolute;
}

.messages-move {
  transition: transform 0.3s 0.4s;
}

.messages-enter-active ~ .messages-move {
  transition: none;
}
</style>
