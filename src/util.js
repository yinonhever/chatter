import moment from "moment";

export const sortByDates = messages => {
    const dates = [];
    messages.forEach((message) => {
        const existingDateIndex = dates.findIndex(
            (item) =>
                moment(item.date).format("LL") ===
                moment(message.sentAt).format("LL")
        );
        if (existingDateIndex >= 0) {
            dates[existingDateIndex].messages.push(message);
        } else {
            dates.push({
                date: new Date(message.sentAt),
                messages: [message],
            });
        }
    });
    return dates;
}