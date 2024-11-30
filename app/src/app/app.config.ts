import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase, ref, set } from 'firebase/database';
import {
  initializeApp as initializeApp_alias,
  provideFirebaseApp,
} from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {
  getDatabase as getDatabase_alias,
  provideDatabase,
} from '@angular/fire/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyC5QOr-3qAgg2Ofpum5I5soddugAFV6owM',
//   authDomain: 'angular-77bd6.firebaseapp.com',
//   databaseURL:
//     'https://angular-77bd6-default-rtdb.europe-west1.firebasedatabase.app',
//   projectId: 'angular-77bd6',
//   storageBucket: 'angular-77bd6.firebasestorage.app',
//   messagingSenderId: '959123590684',
//   appId: '1:959123590684:web:0d8288cf2c5fe0c95e99d9',
//   measurementId: 'G-F8MX3NVC2N',
// };

// Initialize Firebase

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'angular-77bd6',
        appId: '1:959123590684:web:0d8288cf2c5fe0c95e99d9',
        databaseURL:
          'https://angular-77bd6-default-rtdb.europe-west1.firebasedatabase.app',
        storageBucket: 'angular-77bd6.firebasestorage.app',
        apiKey: 'AIzaSyC5QOr-3qAgg2Ofpum5I5soddugAFV6owM',
        authDomain: 'angular-77bd6.firebaseapp.com',
        messagingSenderId: '959123590684',
        measurementId: 'G-F8MX3NVC2N',
      })
    ),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
  ],
};
