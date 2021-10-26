import axios from "axios";
import { subscriptionRouteStaging } from '../constants/urls';

export const subscribe = async (details={}) => {
    let url;
    url = subscriptionRouteStaging + '/sub';
    const response = await axios.post(url, details);
    const status = await response.data;
    return status;
}