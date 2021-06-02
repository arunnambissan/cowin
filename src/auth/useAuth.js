import { useContext } from 'react';
import AuthContext from './context';
import logger from '../utils/logger';
import userModel from '../firestore/user';

import firebase from "firebase/app";
import "firebase/auth";

const auth = firebase.auth;

export default () => {
  const { user, setUser, authInProgress, setAuthInProgress, setProfileSwitchInProgress } = useContext(
    AuthContext,
  );

  const signInWithEmail = async ({ email, password }) => {
    const response = await auth().signInWithEmailAndPassword(email, password);
    window.location.href = "/dashboard";
  }

  const sendOtpForLogIn = (phoneNumber, resend = false) => {
    return new Promise(async (resolve) => {
      try {

        let confirmation;
        const appVerifier = window.recaptchaVerifier;

        // if (resend) {
        // } else {
        // }

        confirmation = await auth().signInWithPhoneNumber(phoneNumber, appVerifier);


        resolve({ success: true, confirmation });
      } catch (err) {
        let error = {};
        if (err.code === 'missing-phone-number') {
          error.message = 'Missing Phone Number.';
        } else if (err.code === 'auth/invalid-phone-number') {
          error.message = 'Invalid Phone Number.';
        } else if (err.code === 'auth/quota-exceeded') {
          error.message = 'SMS quota exceeded.Please try again later.';
          logger.log({ err, error });
        } else if (err.code === 'auth/user-disabled') {
          error.message = 'Phone Number disabled. Please contact support.';
          logger.log({ err, error });
        } else {
          error.message = 'Unexpected Error Occured. Please contact support.';
          logger.log({ err, error });
        }
        resolve({ success: false, error });
      }
    });
  };

  const confirmOtpAndLogIn = async (confirmation, otp) => {
    return new Promise(async (resolve) => {
      try {
        await confirmation.confirm(otp);
        resolve({ success: true });
      } catch (error) {
        logger.log(error);
        resolve({ success: false, error });
      }
    });
  };

  const registerUser = async (userData) => {
    return new Promise(async (resolve) => {
      await userModel.createNewUser({
        ...userData,
        uid: user.uid,
      });

      let newUserDoc = await userModel.getCurrentUser(user.uid);

      setUser({
        ...user,
        ...newUserDoc[0],
      });

      resolve();
    });
  };

  const listenAuthState = () => {
    auth().onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await userModel.getCurrentUser(user.uid);
        if (userDoc && userDoc[0]) {
          let defaultProfile = userDoc[0];

          if (defaultProfile.type === "admin") {
            logOut();
            window.location.href = "/login?error=AccessDenied";
            return;
          }

          setUser({
            ...user,
            ...defaultProfile,
          });
        } else {
          setUser(user);
        }
      }

      setAuthInProgress(false);
    });
  };

  const logOut = async () => {
    setUser(null);
    await auth().signOut();
    window.location.href = "/login";
  };

  const isPartiallyAuthenticated = () => user && user.uid;

  const isAuthenticated = () => user && user.id;

  const switchProfile = (profileDoc) => {
    setProfileSwitchInProgress(true);
    setUser({
      ...user,
      ...profileDoc,
    });
  }

  const createNewProfile = async (userData) => {
    const newProfile = await userModel.createNewUser({
      ...userData,
      uid: user.uid,
      isDefault: false
    });

    const newUserProfileDoc = await userModel.getUserProfile(user.uid, newProfile.id);

    switchProfile(newUserProfileDoc[0]);
  }

  return {
    user,
    authInProgress,
    sendOtpForLogIn,
    confirmOtpAndLogIn,
    listenAuthState,
    registerUser,
    logOut,
    isPartiallyAuthenticated,
    isAuthenticated,
    switchProfile,
    setProfileSwitchInProgress,
    createNewProfile,
    signInWithEmail,
  };
};
