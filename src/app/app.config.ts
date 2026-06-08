import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAs7W8_mRjH81_XyZp2Nq0vLM4t3K5eR8s",
  authDomain: "betteruntis-7b9fe.firebaseapp.com",
  projectId: "betteruntis-7b9fe",
  storageBucket: "betteruntis-7b9fe.appspot.com",
  messagingSenderId: "591980157388",
  appId: "1:591980157388:web:7b9fe2a788e491cebce569"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    // Firebase Verbindung sauber initialisiert:
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ]
};
