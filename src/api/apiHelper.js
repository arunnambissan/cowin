import logger from "../utils/logger";
import apiUrls from "./apiUrls";

const get = (url, data) => {
    // fetch()
}

const post = (url, body) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "POST",
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        }).then((res) => {
            logger.log(res)
            resolve(res);
        }).catch((err) => {
            logger.log(err)
        });
    });
}

/**
 * PUBLIC METHODS
 */
const sendOTP = ({ phoneNumber }) => {
    // return post(apiUrls.sendOtp, { mobile: phoneNumber });
}

export default {
    sendOTP
}