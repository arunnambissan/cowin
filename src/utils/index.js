import moment from "moment";

export const isArrayEmpty = (arr) => {
    return !(arr && arr.length > 0);
}

export const removeMultiWhiteSpaces = (str) => {
    return str.replace(/ +(?= )/g, '');
}

export const uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            // return the blob
            resolve(xhr.response);
        };

        xhr.onerror = function () {
            // something went wrong
            reject(new Error('uriToBlob failed'));
        };
        // this helps us get a blob
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);

        xhr.send(null);
    });
}

export const getUniqueIntegerFromString = (string) => {
    // let cInt = Chance(string);
    // return cInt.integer({ min: 1, max: 4294967295 });
}

export const formatDate = (date) => {
    return moment(date).format("DD/MM/Y HH:mm:ss");
}

export const calculateDuration = (start, end) => {
    return Math.ceil(moment.duration(moment(end).diff(start)).asMinutes()) + ' minutes';
}

export const getQueryParamValue = (key) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
}