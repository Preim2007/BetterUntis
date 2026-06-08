import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // <-- WICHTIG

@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [RouterLink], // <-- Hier hinzufügen
  templateUrl: './mainpage.html',
  styleUrl: './mainpage.css',
})
export class Mainpage {}
