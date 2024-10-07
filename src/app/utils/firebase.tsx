// src/utils/firebase.ts
import { doc, getDoc, setDoc, updateDoc, collection, getDocs, writeBatch  } from 'firebase/firestore';
import { db } from '../../firebaseConfig'
import moveData from '../../../bluebeltTest.json'

export async function createUserDocument(userId: string, userData: any) {
    try {
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, {
            profile: {
                ...userData,
                beltAwards: {}, // Initialize beltAwards as an empty object
                createdAt: new Date().toISOString()
            }
        }, { merge: true });
        console.log('User document created successfully for ID:', userId);
        return true;
    } catch (error) {
        console.error('Error creating user document:', error);
        throw error;
    }
}
export async function getUserData(userId: string) {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log('User data:', userData);
      // Ensure beltAwards exists, even if it's empty
      if (!userData.profile.beltAwards) {
        userData.profile.beltAwards = {};
      }
      return userData;
    } else {
      console.log('No user document found for ID:', userId);
      return null;
    }
  }

export async function updateUserProfile(userId: string, data: any) {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, { profile: data });
}

export async function getMoveData(userId: string) {
    try {
      const movesCollection = collection(db, 'users', userId, 'moves');
      const moveSnapshot = await getDocs(movesCollection);
      const moveData = moveSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Fetched move data:', moveData); // Debug log
      return moveData;
    } catch (error) {
      console.error('Error fetching move data:', error);
      throw error;
    }
  }

  export async function loadMoveCardsToFirebase(userId: string, moveCards: any[]) {
    try {
      const movesCollection = collection(db, 'users', userId, 'moves');
      const batch = writeBatch(db);
  
      moveCards.forEach((card) => {
        const newDocRef = doc(movesCollection);
        batch.set(newDocRef, card);
      });
  
      await batch.commit();
      console.log('Move cards loaded successfully');
    } catch (error) {
      console.error('Error loading move cards:', error);
      throw error;
    }
  }


export async function updateUserMove(userId: string, moveId: string, data: any) {
    const moveRef = doc(db, 'users', userId, 'moves', moveId);
    await updateDoc(moveRef, data);
}