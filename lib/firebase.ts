import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Firebase 환경 변수 설정
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || 
    (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID 
      ? `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com` 
      : undefined)
};

// Firebase 앱 초기화 (중복 초기화 방지)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Firebase 서비스 인스턴스 초기화
let database: Database | null = null;
let firestore: Firestore | null = null;
let auth: Auth | null = null;
let storage: ReturnType<typeof getStorage> | null = null;

// Firebase 구성이 완전한 경우 초기화 (빌드 시 실행 방지)
const initializeFirebaseServices = () => {
  // 빌드 시 Firebase 초기화 방지
  if (typeof window === 'undefined' && process.env.NODE_ENV === 'production' && !process.env.VERCEL_ENV) {
    console.log('🏗️ 빌드 환경에서는 Firebase 초기화를 건너뜁니다.');
    return false;
  }

  if (firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.databaseURL) {
    try {
      console.log('Firebase 서비스 초기화 중...', {
        apiKey: firebaseConfig.apiKey ? '설정됨' : '없음',
        projectId: firebaseConfig.projectId,
        databaseURL: firebaseConfig.databaseURL
      });
      
      // Realtime Database 인스턴스
      database = getDatabase(app);
      
      // Firestore 인스턴스
      firestore = getFirestore(app);
      
      // Authentication 인스턴스
      auth = getAuth(app);
      
      // Storage 인스턴스
      storage = getStorage(app);
      
      console.log('✅ Firebase 서비스 초기화 완료');
      return true;
    } catch (error) {
      console.error('❌ Firebase 초기화 오류:', error);
      return false;
    }
  } else {
    console.error('❌ Firebase 환경 변수가 불완전합니다:', {
      apiKey: !!firebaseConfig.apiKey,
      projectId: !!firebaseConfig.projectId,
      databaseURL: !!firebaseConfig.databaseURL
    });
    return false;
  }
};

// 런타임에서만 초기화 실행 (빌드 시 건너뛰기)
let isInitialized = false;
if (typeof window !== 'undefined' || process.env.VERCEL_ENV) {
  isInitialized = initializeFirebaseServices();
}

// 동적으로 database 인스턴스를 반환하는 함수 (모바일 환경 대응)
export const getFirebaseDatabase = () => {
  if (!database) {
    console.warn('⚠️ Database가 초기화되지 않음, 재시도 중...');
    initializeFirebaseServices();
  }
  return database;
};

export { database, firestore, auth, storage, isInitialized };
export default app;