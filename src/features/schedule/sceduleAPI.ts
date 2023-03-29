import axios from "axios";

export const fetchSchedule = () => {
    return axios.get('http://localhost:5000/todo/api/v1.0/data').then(r => r.data.data)
}