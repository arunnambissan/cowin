const setItem = (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
}

const getItem = (key) => {
    let value = window.localStorage.getItem(key);

    if (value) {
        return JSON.parse(value);
    }

    return null;
}

export default {
    setItem,
    getItem
}