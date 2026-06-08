import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // <-- Das importiert die Link-Logik

@Component({
  selector: 'app-liste',
  standalone: true,
  imports: [RouterLink], // <-- Das schaltet den Router für dein HTML frei
  templateUrl: './liste.html',
  styleUrl: './liste.css'
})
export class Liste { } // Oder falls du sie "ListeComponent" genannt hast, den Klassennamen so lassen
