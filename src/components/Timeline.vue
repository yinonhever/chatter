<template>
  <Pagination v-model="page" v-bind="paginationOptions" />
  <TransitionGroup
    tag="main"
    class="timeline fade-from-left"
    :name="transitionName"
  >
    <TimelineDate
      v-for="item in dates"
      :key="item.date"
      :date="item.date"
      :messages="item.messages"
    />
  </TransitionGroup>
  <Pagination v-model="page" v-bind="paginationOptions" />
</template>

<script>
import Pagination from "v-pagination-3";
import TimelineDate from "./TimelineDate";
import moment from "moment";

const messagesPerPage = 250;

export default {
  components: { Pagination, TimelineDate },
  props: {
    messages: Array,
  },
  data() {
    return {
      page: 1,
      paginationOptions: {
        records: this.messages.length,
        perPage: messagesPerPage,
        options: {
          chunk: 5,
          theme: "bootstrap4",
          texts: {
            count:
              "Showing {from} to {to} of {count} messages|{count} messages|One message",
          },
        },
      },
      transitionName: "date",
    };
  },
  computed: {
    displayedMessages() {
      const start = (this.page - 1) * messagesPerPage;
      const end = start + messagesPerPage;
      return this.messages.slice(start, end);
    },
    dates() {
      const dates = [];
      this.displayedMessages.forEach((message) => {
        const existingDateIndex = dates.findIndex(
          (item) =>
            moment(item.date).format("LL") ===
            moment(message.created_at).format("LL")
        );
        if (existingDateIndex >= 0) {
          dates[existingDateIndex].messages.push(message);
        } else {
          dates.push({
            date: new Date(message.created_at),
            messages: [message],
          });
        }
      });
      return dates;
    },
  },
  watch: {
    page(value, oldValue) {
      if (value < oldValue) {
        this.transitionName = "date-backwards";
      } else {
        this.transitionName = "date";
      }
    },
  },
  methods: {
    bottomPaginationListeners() {
      const bottomPaginateButtons = Array.from(
        document.querySelectorAll(".VuePagination:last-child li")
      );
      bottomPaginateButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          if (!event.target.classList.contains("disabled")) {
            window.scrollTo(0, 150);
          }
        });
      });
    },
  },
  mounted() {
    this.bottomPaginationListeners();
  },
};
</script>

<style lang="scss">
.timeline {
  width: 100%;
  max-width: 66.66rem;
  margin: auto;
}

.VuePagination {
  display: flex;
  justify-content: center;
  text-align: center;
  animation: fadeFromRight 0.5s ease-out;

  * {
    transition: color 0.5s, background-color 0.5s;
  }

  &:not(:last-child) {
    margin-bottom: 3rem;
  }

  &:last-child {
    margin-top: 5rem;
  }

  &__pagination {
    box-shadow: rgba(62, 57, 107, 0.3) 0px 6px 16px 0px;
  }

  nav {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.date-leave-to,
.date-backwards-enter-from {
  transform: translateX(100vw);
}

.date-backwards-leave-to,
.date-enter-from {
  transform: translateX(-100vw);
}

.date-leave-active,
.date-backwards-leave-active {
  transition: all 0.35s ease-out;
}

.date-enter-active,
.date-backwards-enter-active {
  transition: all 0.35s 0.35s ease-out;
}
</style>
