// src/utils/userUtils.ts
import { User, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { getFirebaseApp, getDb, getAuth } from '../../firebaseConfig';

// When you need Firebase App
const app = getFirebaseApp();

// When you need Firestore
const db = getDb();

// When you need Auth
const auth = getAuth();

interface UserProfile {
  displayName: string;
  email: string;
  totalGamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  beltAwards: Record<string, number>;
  createdAt: string;
}

export const signUp = async (email: string, password: string): Promise<User> => {
  const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
  await createUserProfile(userCredential.user.uid, {
    displayName: userCredential.user.displayName || '',
    email: userCredential.user.email || '',
  });
  console.log('User created:', userCredential.user);
  return userCredential.user;
};

export const signIn = async (email: string, password: string): Promise<User> => {
  const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logOut = (): Promise<void> => signOut(auth);

export async function createUserProfile(userId: string, userData: {
  displayName: string;
  email: string;
}): Promise<UserProfile> {
  const userRef = doc(db, 'users', userId);
  const userProfile: UserProfile = {
    displayName: userData.displayName,
    email: userData.email,
    totalGamesPlayed: 0,
    gamesWon: 0,
    gamesLost: 0,
    beltAwards: {},
    createdAt: new Date().toISOString()
  };
  await setDoc(userRef, userProfile);
  console.log('User profile created:', userProfile);
  return userProfile;
}

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data() as UserProfile;
  }
  return null;
};

export const updateUserScore = async (userId: string, beltAwarded: string): Promise<void> => {
  const userRef = doc(db, 'users', userId);
  const userProfile = await getUserProfile(userId);
  
  if (!userProfile) {
    console.error('User profile not found');
    return;
  }

  // Ensure beltAwards is initialized as an object
  const currentBeltAwards = userProfile.beltAwards || {};

  const updatedBeltAwards = {
    ...currentBeltAwards,
    [beltAwarded]: (currentBeltAwards[beltAwarded] || 0) + 1
  };

  await updateDoc(userRef, {
    totalGamesPlayed: (userProfile.totalGamesPlayed || 0) + 1,
    beltAwards: updatedBeltAwards
  });
};