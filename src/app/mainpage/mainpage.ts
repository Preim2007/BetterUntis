import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './mainpage.html',
  styleUrl: './mainpage.css',
})
export class Mainpage {
  // Die exakten Zeiteinheiten aus deinem Screenshot
  zeitSlots = [
    '08:15 - 09:05', // 1. Stunde
    '09:10 - 10:00', // 2. Stunde
    '10:05 - 10:55', // 3. Stunde
    '11:00 - 11:50', // 4. Stunde
    '11:55 - 12:45', // 5. Stunde
    '12:50 - 13:40', // 6. Stunde
    '13:45 - 14:35', // 7. Stunde
    '14:40 - 15:30', // 8. Stunde
    '15:35 - 16:25'  // 9. Stunde
  ];

  // Der exakte Stundenplan aus deinem Bild
  stundenplan: any = {
    '08:15 - 09:05': {
      mo: 'Freistunde',
      di: 'Freistunde',
      mi: 'LOIB / INSY (V308)',
      do: 'PACO / D (N302)',
      fr: 'Freistunde'
    },
    '09:10 - 10:00': {
      mo: 'HIES / ITP2 (V303)',
      di: 'Freistunde',
      mi: 'LOIB / INSY (V308)',
      do: 'PACO / D (N302)',
      fr: 'VLCK / WIR_2 (N302)'
    },
    '10:05 - 10:55': {
      mo: 'HIES / ITP2 (V303)',
      di: 'SA... / MDP (N3...)',
      mi: 'SHEL / AM (V303)',
      do: 'SACH / MEDT (N304)',
      fr: 'OETT / MEDT (V307)'
    },
    '11:00 - 11:50': {
      mo: 'HIES / ITP2 (V303)',
      di: 'SA... / MDP (N3...)',
      mi: 'SHEL / AM (V303)',
      do: 'SACH / MEDT (N304)',
      fr: 'OETT / MEDT (V307)'
    },
    '11:55 - 12:45': {
      mo: 'HIES / ITP2 (V303)',
      di: 'Freistunde',
      mi: 'SHEL / GGP (N302)',
      do: 'KUEN / ITP2 (N304)',
      fr: 'FRYJ / WIR_3 (N302)'
    },
    '12:50 - 13:40': {
      mo: 'Freistunde',
      di: 'EIST / E1 (N302)',
      mi: 'Freistunde',
      do: 'KUEN / ITP2 (N304)',
      fr: 'FRYJ / WIR_3 (N302)'
    },
    '13:45 - 14:35': {
      mo: 'TSLO / NW2 (N302)',
      di: 'EIST / E1 (N302)',
      mi: 'Freistunde',
      do: 'Freistunde',
      fr: 'PACO / GGP (N302)'
    },
    '14:40 - 15:30': {
      mo: 'TSLO / NW2 (N302)',
      di: 'MAMU / SEW (V308)',
      mi: 'Freistunde',
      do: 'LOIB / INSY (V308)',
      fr: 'Freistunde'
    },
    '15:35 - 16:25': {
      mo: 'PAYR / BSPK',
      di: 'MAMU / SEW (V308)',
      mi: 'Freistunde',
      do: 'O... / ...',
      fr: 'Freistunde'
    }
  };
}
