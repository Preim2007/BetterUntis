import { Component, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgForOf, isPlatformBrowser } from '@angular/common'; // <-- Die Imports sind da...
import { initializeApp, getApps } from '@firebase/app';
import { initializeFirestore, collection, getDocs } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAs7W8_mRjH81_XyZp2Nq0vLM4t3K5eR8s",
  authDomain: "betteruntis-7b9fe.firebaseapp.com",  // Hier kamen deine Daten vorhin an!
  projectId: "betteruntis-7b9fe",                 // Hier kamen deine Daten vorhin an!
  storageBucket: "betteruntis-7b9fe.appspot.com",
  messagingSenderId: "591980157388",
  appId: "1:591980157388:web:7b9fe2a788e491cebce569"
};

@Component({
  selector: 'app-liste',
  standalone: true,
  imports: [NgForOf], // <-- HIER war der Knackpunkt! NgForOf MUSS hier drin stehen!
  templateUrl: './liste.html',
  styleUrl: './liste.css'
})
export class Liste {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  profiles: any[] = [];

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadProfiles();
    }
  }

  async loadProfiles() {
    try {
      console.log('Lade Profile über HTTP-Tunnel...');

      const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
      const db = initializeFirestore(app, {
        experimentalForceLongPolling: true
      });

      const profileCollection = collection(db, 'profiles');
      const querySnapshot = await getDocs(profileCollection);

      this.profiles = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log('Profile erfolgreich geladen:', this.profiles);

      // Signal an Angular, dass neue Daten da sind
      this.cdr.detectChanges();

    } catch (error) {
      console.error('Fehler beim Laden aus Firebase:', error);
    }
  }

  goHome() {
    this.router.navigate(['/']);
  }

  onProfileSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const profileId = selectElement.value;

    if (profileId) {
      this.router.navigate(['/profil', profileId]);
    }
  }

  // Diese Funktion braucht dein HTML für das trackBy
  trackByProfileId(index: number, item: any): string {
    return item.id;
  }
}
