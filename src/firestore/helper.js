import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const firestore = firebase.firestore;
const storage = firebase.storage;

/**
 * INTERNAL METHODS 
 */
const formatDocItem = async (docItem) => {
    let item = {};
    let docKeys = Object.keys(docItem);

    // loop through doc fields
    for (const key of docKeys) {
        item[key] = await formatFieldValue(docItem[key]);
    }

    return item;
}

const getReferencedObject = async (ref) => {
    const refItem = await ref.get();
    return { ...refItem.data(), id: refItem.id };
}

const formatFieldValue = async (value) => {
    let formatedValue;

    if (value.firestore) {
        formatedValue = await getReferencedObject(value);
    } else {
        formatedValue = value;
    }

    return formatedValue;
}

/**
 * PUBLIC METHODS 
 */
const getCollection = async ({ collectionName, conditions, orderBy, startAfter, limit, skipFormatting = true }) => {
    let collection = firestore().collection(collectionName);

    if (conditions) {
        conditions.forEach(condition => {
            collection = collection.where(condition[0], condition[1], condition[2]);
        });
    }

    if (orderBy) {
        orderBy.forEach(orderByItem => {
            collection = collection.orderBy(orderByItem[0], orderByItem[1]);
        });
    }

    if (startAfter) {
        collection = collection.startAfter(startAfter);
    }

    if (limit) {
        collection = collection.limit(limit);
    }

    collection = await collection.get();
    let items = [];

    if (collection.empty)
        return items;

    for (const doc of collection.docs) {
        const docItemId = doc.id;

        let docItem = doc.data();
        if (!skipFormatting) {
            docItem = await formatDocItem(docItem);
        }
        items.push({
            ...docItem,
            id: docItemId,
            doc
        });
    }

    return items;
}


const createNewDocument = ({ collectionName, data }) => {
    return firestore().collection(collectionName).add(data);
}

const updateDocument = ({ collectionName, docId, data }) => {
    return firestore().collection(collectionName).doc(docId).update(data);
}

const getDocumentRef = (collectionName, docId) => firestore().collection(collectionName).doc(docId);

const uploadFile = ({ storagePath, localUri, isBlob = false }) => {
    const reference = storage().ref(storagePath);

    if (isBlob)
        return reference.put(localUri);
    else
        return reference.putFile(localUri);
}

const getFileUrl = (ref) => {
    return storage().ref(ref).getDownloadURL();
}

const getReferencedObjects = ({ collectionName, references }) => {
    let referenceIds = references.map(reference => reference.id);

    return getCollection({
        collectionName,
        conditions: [
            [firestore.FieldPath.documentId(), 'in', Array.from(referenceIds)]
        ],
    });
}

const getDoc = async ({ collectionName, docId }) => {
    const doc = await firestore().collection(collectionName).doc(docId).get();
    const docItemId = doc.id;

    let docItem = doc.data();

    return { ...docItem, id: docItemId, doc };
}

const getDocsWithId = async ({ collectionName, docIds }) => {

    const docIdChunks = [];
    const allDocs = [];

    while (docIds.length > 0)
        docIdChunks.push(docIds.splice(0, 10));

    for (const docIdChunk of docIdChunks) {
        let docs = await getCollection({
            collectionName,
            conditions: [
                [firestore.FieldPath.documentId(), 'in', docIdChunk]
            ],
        });

        docs.forEach((doc) => {
            allDocs.push(doc);
        });
    }

    return allDocs;
}

export default {
    getCollection,
    createNewDocument,
    updateDocument,
    getDocumentRef,
    uploadFile,
    getFileUrl,
    getReferencedObjects,
    getDocsWithId,
    getDoc
};