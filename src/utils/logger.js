// import crashlytics from '@react-native-firebase/crashlytics';

const log = (error) => {
    console.log(error);
    // try {
    //     crashlytics().recordError(new Error(JSON.stringify({env: process.env, error})));
    // } catch (err) {}
}

export default { 
    log
};
