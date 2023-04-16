import axios from "axios";

export const fetchSchedule = () => {
    return axios.get('http://localhost:5000/api').then(r => r.data.data)
}