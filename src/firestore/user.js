import helper from './helper';
import { getUniqueIntegerFromString } from '../utils';
import firebase from "firebase/app";
import "firebase/firestore";

const firestore = firebase.firestore;

const getCurrentUser = (uid) => {
    return helper.getCollection({
        collectionName: "users",
        conditions: [
            ["uid", "==", uid],
            ["isDefault", "==", true]
        ]
    });
}

const getUserByPhone = (phoneNumber) => {
    return helper.getCollection({
        collectionName: "users",
        conditions: [
            ["phoneNumber", "==", phoneNumber]
        ]
    });
}

const getUserProfile = (uid, docId) => {
    return helper.getCollection({
        collectionName: "users",
        conditions: [
            ["uid", "==", uid],
            [firestore.FieldPath.documentId(), '==', docId]
        ]
    });
}

const createNewUser = (user) => {
    return helper.createNewDocument({
        collectionName: "users",
        data: {
            isDefault: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            intId: getUniqueIntegerFromString(user.uid + user.name),
            subscribedCoursesCount: 0,
            ...user
        }
    });
}

const getUserProfiles = (uid) => {
    return helper.getCollection({
        collectionName: "users",
        conditions: [
            ["uid", "==", uid],
        ],
        orderBy: [
            ["createdAt"]
        ]
    });
}

const getUserDetailsFromRefs = (userRefs) => {
    return helper.getCollection({
        collectionName: "users",
        conditions: [
            [firestore.FieldPath.documentId(), 'in', Array.from(userRefs)]
        ],
    });
}

const incrementSubscribedCoursesCount = (userId) => {
    return helper.updateDocument({
        collectionName: "users",
        docId: userId,
        data: {
            subscribedCoursesCount: firestore.FieldValue.increment(1),
            updatedAt: new Date()
        }
    });
}

export default {
    getCurrentUser,
    createNewUser,
    getUserProfiles,
    getUserProfile,
    getUserDetailsFromRefs,
    incrementSubscribedCoursesCount,
    getUserByPhone
};
