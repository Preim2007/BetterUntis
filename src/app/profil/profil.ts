import { Component, inject, PLATFORM_ID, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { initializeApp, getApps } from '@firebase/app';
import { initializeFirestore, doc, getDoc, updateDoc } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAs7W8_mRjH81_XyZp2Nq0vLM4t3K5eR8s",
  authDomain: "betteruntis-7b9fe.firebaseapp.com",
  projectId: "betteruntis-7b9fe",
  storageBucket: "betteruntis-7b9fe.appspot.com",
  messagingSenderId: "591980157388",
  appId: "1:591980157388:web:7b9fe2a788e491cebce569"
};

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profil.html',
  styleUrl: './profil.css'
})
export class Profil implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  profileId: string | null = null;
  inputPassword = '';
  isUnlocked = false;
  isReadOnly = false;
  passwordError = false;

  defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

  profileData: any = {
    name: '',
    nachname: '',
    klasse: '',
    rolle: 'Schüler',
    schuelerLehrerId: '',
    klassenzimmerNummer: '',
    hobby: '',
    passwort: '', // Wird hier für das Formular bereitgehalten
    avatarUrl: ''
  };

  ngOnInit() {
    this.profileId = this.route.snapshot.paramMap.get('id');
    if (isPlatformBrowser(this.platformId) && this.profileId) {
      this.loadProfileDetails();
    }
  }

  async loadProfileDetails() {
    try {
      const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
      const db = initializeFirestore(app, { experimentalForceLongPolling: true });

      const docRef = doc(db, 'profiles', this.profileId!);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        this.profileData = {
          name: data['name'] || '',
          nachname: data['nachname'] || '',
          klasse: data['klasse'] || '',
          rolle: data['rolle'] || 'Schüler',
          schuelerLehrerId: data['schuelerLehrerId'] || '',
          klassenzimmerNummer: data['klassenzimmerNummer'] || '',
          hobby: data['hobby'] || '',
          passwort: data['passwort'] || '', // Lädt das Passwort direkt aus Firebase!
          avatarUrl: data['avatarUrl'] || ''
        };
        this.cdr.detectChanges();
      }
    } catch (error) {
      console.error('Fehler beim Laden:', error);
    }
  }

  verifyPassword() {
    // 1. Eingabe sichern und komplett in Kleinbuchstaben umwandeln
    const eingegeben = this.inputPassword ? this.inputPassword.trim().toLowerCase() : '';

    // 2. Den Namen aus Firebase holen, sichern und komplett in Kleinbuchstaben umwandeln
    const nameAlsPasswort = this.profileData && this.profileData.name
      ? this.profileData.name.trim().toLowerCase()
      : '';

    // 3. Das Passwort aus Firebase holen (falls vorhanden) und in Kleinbuchstaben umwandeln
    const firebasePasswort = this.profileData && this.profileData.passwort
      ? this.profileData.passwort.trim().toLowerCase()
      : '';

    // 4. Wenn in Firebase ein Passwort drin steht, nimm das. Ansonsten nimm den Namen.
    const loesung = (firebasePasswort !== '') ? firebasePasswort : nameAlsPasswort;

    console.log('--- DER ULTIMATIVE CHECK ---');
    console.log('Deine Eingabe im Feld:', eingegeben);
    console.log('Name des Profils (klein):', nameAlsPasswort);
    console.log('Passwort in Firebase (klein):', firebasePasswort ? firebasePasswort : '- KEINS VORHANDEN -');
    console.log('Das System erwartet deshalb exakt:', loesung);

    // 5. Der finale Vergleich (egal ob Groß- oder Kleinschreibung!)
    if (eingegeben === loesung && loesung !== '') {
      console.log('✅ ERFOLG! Formular wird geöffnet.');
      this.isUnlocked = true;
      this.isReadOnly = false;
      this.passwordError = false;
    } else {
      console.log('❌ FEHLGESCHLAGEN! Passwort oder Name stimmt nicht überein.');
      this.passwordError = true;
      this.isUnlocked = false;
    }
    this.cdr.detectChanges();
  }

  viewInfoOnly() {
    this.isUnlocked = true;
    this.isReadOnly = true;
    this.passwordError = false;
    this.cdr.detectChanges();
  }

  async saveChanges() {
    try {
      // Validierung: Der User sollte das Passwort nicht komplett leeren
      if (!this.profileData.passwort || this.profileData.passwort.trim() === '') {
        alert('Bitte vergib ein gültiges Passwort, bevor du speicherst!');
        return;
      }

      const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
      const db = initializeFirestore(app, { experimentalForceLongPolling: true });

      const docRef = doc(db, 'profiles', this.profileId!);

      // Sendet das gesamte Objekt (inklusive .passwort) an Firebase Firestore
      await updateDoc(docRef, this.profileData);

      alert('💾 Profil und Passwort erfolgreich in Firebase gespeichert!');
      this.router.navigate(['/liste']);
    } catch (error) {
      console.error('Fehler beim Speichern:', error);
      alert('Fehler beim Aktualisieren der Daten.');
    }
  }

  goBack() {
    this.router.navigate(['/liste']);
  }
}
