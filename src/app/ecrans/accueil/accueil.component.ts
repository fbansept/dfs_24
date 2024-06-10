import { Component } from '@angular/core';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss',
})
export class AccueilComponent {
  categories: any[] = [
    {
      titre: 'Top',
      elements: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLoJ1mVKvp9QfBQuxdPDE1OQJKgsrch7yu-A&s',
        'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg',
      ],
    },
    {
      titre: 'Bien',
      elements: [
        'https://www.firstpack.fr/img/cms/fast%20food%20c%C3%A9l%C3%A8bre%20(1).jpg',
        'https://media.cnn.com/api/v1/images/stellar/prod/140430115517-06-comfort-foods.jpg?q=w_1110,c_fill',
      ],
    },
    { titre: 'Moyen', elements: [] },
    { titre: 'Nul', elements: [] },
    { titre: 'Horrible', elements: [] },
  ];
}
