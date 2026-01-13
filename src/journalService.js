import { 
  collection, 
  doc, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from './firebase';

const journalsCollection = (userId) => collection(db, 'users', userId, 'journals');

export const addJournal = async (journalData) => {
  try {
    const userId = auth.currentUser.uid;
    const journalWithTimestamp = {
      ...journalData,
      createdAt: serverTimestamp()
    };
    
    const docRef = await addDoc(journalsCollection(userId), journalWithTimestamp);
    return docRef.id;
  } catch (error) {
    throw new Error(`Failed to add journal: ${error.message}`);
  }
};

export const getUserJournals = async () => {
  try {
    const userId = auth.currentUser.uid;
    const q = query(
      journalsCollection(userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    throw new Error(`Failed to fetch journals: ${error.message}`);
  }
};

export const updateJournal = async (journalId, updateData) => {
  try {
    const userId = auth.currentUser.uid;
    const journalRef = doc(db, 'users', userId, 'journals', journalId);
    
    await updateDoc(journalRef, updateData);
    return true;
  } catch (error) {
    throw new Error(`Failed to update journal: ${error.message}`);
  }
};

export const deleteJournal = async (journalId) => {
  try {
    const userId = auth.currentUser.uid;
    const journalRef = doc(db, 'users', userId, 'journals', journalId);
    
    await deleteDoc(journalRef);
    return true;
  } catch (error) {
    throw new Error(`Failed to delete journal: ${error.message}`);
  }
};

export const uploadJournalFile = async (file, journalId) => {
  try {
    const userId = auth.currentUser.uid;
    const fileName = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `journals/${userId}/${journalId}/${fileName}`);
    
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    return downloadURL;
  } catch (error) {
    throw new Error(`Failed to upload file: ${error.message}`);
  }
};
