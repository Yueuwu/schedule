import axios from "axios";

export const fetchSchedule = () => {
    return axios.get('https://nspu.site/api').then(r => r.data.data)
}