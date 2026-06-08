import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Nur noch RouterOutlet hier drin lassen
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'BetterUntis';
}
