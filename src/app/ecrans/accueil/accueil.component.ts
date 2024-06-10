import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss',
})
export class AccueilComponent {
  categories: { titre: string; elements: string[] }[] = [];

  saisieInputUrl: string = '';

  ngOnInit() {
    const jsonCategories = localStorage.getItem('categories');

    if (jsonCategories) {
      this.categories = JSON.parse(jsonCategories);
    } else {
      this.categories = [
        { titre: 'Top', elements: [] },
        { titre: 'Bien', elements: [] },
        { titre: 'Moyen', elements: [] },
        { titre: 'Nul', elements: [] },
        { titre: 'Horrible', elements: [] },
      ];
    }
  }

  onClicAjouterElement() {
    this.categories[0].elements.push(this.saisieInputUrl);

    this.saisieInputUrl = '';

    this.sauvegarde();
  }

  onClicBoutonHaut() {}

  onClicBoutonBas() {}

  onClicBoutonSupprimeElement(indexCategorie: number, indexElement: number) {
    this.categories[indexCategorie].elements.splice(indexElement, 1);

    this.sauvegarde();
  }

  sauvegarde() {
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }
}
