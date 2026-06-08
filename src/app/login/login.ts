import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common'; // <-- Wichtig für SSR-Schutz!
import { initializeApp, getApps } from '@firebase/app';
import { initializeFirestore, collection, addDoc } from '@firebase/firestore';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmGhxNOXHcCm8GFWqMo7KJ7LOvHtk_2JA",
  authDomain: "betteruntis-28421.firebaseapp.com",
  projectId: "betteruntis-28421",
  storageBucket: "betteruntis-28421.firebasestorage.app",
  messagingSenderId: "591980157388",
  appId: "1:591980157388:web:7b9fe2a788e491cebce569"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID); // <-- Prüft, wo der Code gerade läuft

  goHome() {
    this.router.navigate(['/']);
  }

  async handleLogin(role: string, username: string) {
    if (!username || !username.trim()) {
      alert('Bitte gib einen Benutzernamen ein!');
      return;
    }

    // SICHERHEITS-ABFRAGE: Wenn der Code auf dem Server läuft -> SOFORT ABBRECHEN!
    if (!isPlatformBrowser(this.platformId)) {
      console.log('❌ Server-Side-Rendering blockiert. Warte auf Browser...');
      return;
    }

    console.log('✅ Garantiert im Browser! Starte Firebase-Connect für:', username);

    try {
      const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

      const db = initializeFirestore(app, {
        experimentalForceLongPolling: true
      });

      console.log('HTTP-Tunnel steht. Sende Daten...');
      const profileCollection = collection(db, 'profiles');

      await addDoc(profileCollection, {
        name: username.trim(),
        rolle: role,
        createdAt: new Date().toISOString()
      });

      console.log('💥 BÄM! In der Cloud gespeichert! Leite weiter...');
      this.router.navigate(['/liste']);

    } catch (error: any) {
      console.error('Direkter Firebase-Fehler:', error);
      alert('Fehler: ' + error.message);
    }
  }
}
