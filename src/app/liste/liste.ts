import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste',
  standalone: true,
  imports: [],
  templateUrl: './liste.html',
  styleUrl: './liste.css'
})
export class Liste {

  // Der Constructor holt den Router in die Komponente
  constructor(private router: Router) {}

  // Diese Funktion MUSS exakt so heißen wie im HTML
  goHome() {
    this.router.navigate(['/']);
  }

}
