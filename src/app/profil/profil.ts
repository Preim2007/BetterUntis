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

  // Hilfsvariable für das Formular, um den reinen Vornamen sauber zu binden
  vornameEingabe = '';

  profileData: any = {
    name: '', // In Firebase entspricht das dem Anzeigenamen (Liste)
    nachname: '',
    klasse: '',
    rolle: 'Schüler',
    schuelerLehrerId: '',
    klassenzimmerNummer: '',
    hobby: '',
    passwort: '',
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

        let extrahierterVorname = data['name'] || '';
        let extrahierterNachname = data['nachname'] || '';

        // Falls im Namensfeld bereits Vor- und Nachname zusammenstehen, trennen wir es fürs Formular auf
        if (extrahierterVorname.includes(' ') && !extrahierterNachname) {
          const teile = extrahierterVorname.split(' ');
          extrahierterVorname = teile[0];
          extrahierterNachname = teile.slice(1).join(' ');
        }

        this.vornameEingabe = extrahierterVorname;

        this.profileData = {
          name: data['name'] || '',
          nachname: extrahierterNachname,
          klasse: data['klasse'] || '',
          rolle: data['rolle'] || 'Schüler',
          schuelerLehrerId: data['schuelerLehrerId'] || '',
          klassenzimmerNummer: data['klassenzimmerNummer'] || '',
          hobby: data['hobby'] || '',
          passwort: data['passwort'] || '',
          avatarUrl: data['avatarUrl'] || ''
        };
        this.cdr.detectChanges();
      }
    } catch (error) {
      console.error('Fehler beim Laden:', error);
    }
  }

  verifyPassword() {
    const eingegeben = this.inputPassword ? this.inputPassword.trim().toLowerCase() : '';

    // Wir nutzen die saubere vornameEingabe als Fallback-Passwort, falls in Firebase keins existiert
    const nameAlsPasswort = this.vornameEingabe ? this.vornameEingabe.trim().toLowerCase() : '';
    const firebasePasswort = this.profileData && this.profileData.passwort ? this.profileData.passwort.trim().toLowerCase() : '';

    const loesung = (firebasePasswort !== '') ? firebasePasswort : nameAlsPasswort;

    console.log('--- DER ULTIMATIVE CHECK ---');
    console.log('Deine Eingabe im Feld:', eingegeben);
    console.log('Erwartete Lösung:', loesung);

    if (eingegeben === loesung && loesung !== '') {
      this.isUnlocked = true;
      this.isReadOnly = false;
      this.passwordError = false;
    } else {
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
      if (!this.profileData.passwort || this.profileData.passwort.trim() === '') {
        alert('Bitte vergib ein gültiges Passwort, bevor du speicherst!');
        return;
      }

      const vName = this.vornameEingabe ? this.vornameEingabe.trim() : '';
      const nName = this.profileData.nachname ? this.profileData.nachname.trim() : '';

      // Verhindert doppeltes Zusammenkleben, falls im Formular schon der volle Name stand
      const vollerName = (nName && !vName.includes(nName)) ? `${vName} ${nName}` : vName;

      // Wir überschreiben alle gängigen Variablen, um deine Listenseite zu 100% zu treffen
      const datenFuerFirebase = {
        ...this.profileData,
        name: vollerName,
        vorname: vName,
        nachname: nName,
        displayName: vollerName
      };

      const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
      const db = initializeFirestore(app, { experimentalForceLongPolling: true });

      const docRef = doc(db, 'profiles', this.profileId!);
      await updateDoc(docRef, datenFuerFirebase);

      alert('💾 Profil erfolgreich aktualisiert!');

      this.router.navigate(['/liste']).then(() => {
        window.location.reload();
      });

    } catch (error) {
      console.error('Fehler beim Speichern:', error);
      alert('Fehler beim Aktualisieren der Daten.');
    }
  }

  goBack() {
    this.router.navigate(['/liste']);
  }
}
