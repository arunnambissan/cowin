import config from '../config';
import helper from './helper';
import firebase from "firebase/app";
import "firebase/firestore";

const firestore = firebase.firestore;

const getNewGroups = async (startAfter) => {
    return await getAllDetails(await helper.getCollection({
        collectionName: "groups",
        conditions: [
            ["status", "==", "new"]
        ],
        orderBy: [
            ["createdAt", "desc"]
        ],
        startAfter: startAfter,
        limit: config.paginationLimit
    }));
}

const getAllNewGroups = async (startAfter) => {
    let groups = await helper.getCollection({
        collectionName: "groups",
        conditions: [
            ["status", "==", "new"]
        ],
        orderBy: [
            ["createdAt", "desc"]
        ]
    });
    const memberIds = new Set();

    groups.forEach(group => {
        group.members.forEach(member => {
            memberIds.add(member.id);
        });
    });
    const members = await helper.getDocsWithId({
        collectionName: "users",
        docIds: Array.from(memberIds)
    });

    const membersMap = {};
    members.map(member => {
        membersMap[member.id] = member;
    });
    groups.map(group => {
        group.members = group.members.map(member => membersMap[member.id]);
    });
    return groups;
}

const getUserGroups = async (userId, startAfter) => {
    return await getAllDetails(await helper.getCollection({
        collectionName: "groups",
        conditions: [
            ["members", "array-contains", helper.getDocumentRef("users", userId)]
        ],
        orderBy: [
            ["createdAt", "desc"]
        ],
        startAfter: startAfter,
        limit: config.paginationLimit
    }));
}


const getGroupDetails = async (groupId) => {
    const group = await helper.getDoc({ collectionName: "groups", docId: groupId });

    group.subject = await helper.getDoc({ collectionName: "subjects", docId: group.subject.id });

    return group;
}

const getAllDetails = async (groups) => {
    const subjectIds = new Set(groups.map(group => group.subject.id));

    const subjects = await helper.getDocsWithId({
        collectionName: "subjects",
        docIds: Array.from(subjectIds),
    });

    const subjectsMap = {};
    subjects.map(subject => {
        subjectsMap[subject.id] = subject;
    });

    const memberIds = new Set();

    groups.forEach(group => {
        group.members.forEach(member => {
            memberIds.add(member.id);
        });
    });
    const members = await helper.getDocsWithId({
        collectionName: "users",
        docIds: Array.from(memberIds)
    });

    const membersMap = {};
    members.map(member => {
        membersMap[member.id] = member;
    });
    groups.map(group => {
        group.subject = subjectsMap[group.subject.id];
        group.members = group.members.map(member => membersMap[member.id]);
    });
    return groups;
}

const addTutorToGroup = (groupId, memberId) => {
    return helper.updateDocument({
        collectionName: "groups",
        docId: groupId,
        data: {
            members: firestore.FieldValue.arrayUnion(helper.getDocumentRef('users', memberId)),
            status: "assigned"
        }
    });
}

const removeMemberFromGroup = (groupId, memberId, status) => {
    return helper.updateDocument({
        collectionName: "groups",
        docId: groupId,
        data: {
            members: firestore.FieldValue.arrayRemove(helper.getDocumentRef('users', memberId)),
            status: status
        }
    });
}

export default {
    // getUserGroups,
    getGroupDetails,
    getNewGroups,
    getUserGroups,
    addTutorToGroup,
    removeMemberFromGroup,
    getAllNewGroups
};