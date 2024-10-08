import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirebaseApp, getDb, getAuth } from '@/firebaseConfig';
import { createUserDocument } from '@/app/utils/firebase';

// When you need Auth
const auth = getAuth();

export async function signUp(email: string, password: string, displayName: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    await updateProfile(user, { displayName });

    // Create the user document in Firestore
    await createUserDocument(user.uid, {
      displayName,
      email,
      totalGamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0,
      beltAwards: {}
    });

    console.log('User signed up and document created successfully');
    return user;
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
}

export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
}