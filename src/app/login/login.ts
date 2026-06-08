import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // <-- Das importieren

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink], // <-- Das hier eintragen
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login { }
