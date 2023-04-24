import {valueI} from "../features/schedule/scheduleSlice";

export const dayChanger = (day: valueI['day']) => {
    switch (day) {
        case "Monday": return "Понедельник";
        case "Tuesday": return "Вторник";
        case "Wednesday": return "Среда";
        case "Thursday": return "Четверг";
        case "Friday": return "Пятница";
        case "Saturday": return "Суббота";
    }
}