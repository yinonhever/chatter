<template>
  <main class="chat__main" ref="container">
    <Transition name="empty">
      <div v-if="!dates.length" class="chat__empty">
        <i class="far fa-comments" />
        <p>Start a chat by typing a message below.</p>
      </div>
    </Transition>
    <TransitionGroup tag="div" class="chat__timeline" name="messages">
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
  inject: ["getIo"],
  props: {
    dates: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    const { container } = this.$refs;
    const scrollbar = Scrollbar.init(container);
    scrollbar.scrollTop = container.scrollHeight;
    this.getIo().on("addMessage", () => {
      setTimeout(() => {
        scrollbar.scrollTop = container.scrollHeight;
      }, 100);
    });
  },
};
</script>

<style lang="scss">
.chat {
  &__main {
    height: 50rem;
    overflow: auto;
    background-color: rgba(#fff, 0.6);
    background-image: linear-gradient(
        to right,
        rgba(#fff, 0.85),
        rgba(#fff, 0.85)
      ),
      url(../assets/Launch-Day-2.svg);
    background-size: cover;
    background-position: center;
    position: relative;

    .scroll-content {
      min-height: 100%;
    }
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    width: 100%;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
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

.empty-enter-from {
  opacity: 0;
  transform: scale(0) translateY(-50%);
}

.empty-enter-active {
  transition: all 0.5s;
}

.empty-enter-to {
  opacity: 1;
  transform: scale(1) translateY(-50%);
}
</style>
