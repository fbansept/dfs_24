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

  saisieInputCategorie: string = '';

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

  onClicBoutonHaut(indexCategorie: number, indexElement: number) {
    this.deplacerElement(indexCategorie, indexCategorie - 1, indexElement);
  }

  onClicBoutonBas(indexCategorie: number, indexElement: number) {
    this.deplacerElement(indexCategorie, indexCategorie + 1, indexElement);
  }

  deplacerElement(
    indexCategorie: number,
    indexNouvelleCategorie: number,
    indexElement: number
  ) {
    //recupérer la nouvelle categorie
    const nouvelleCategorie = this.categories[indexNouvelleCategorie];

    //copier l'element de l'ancienne catégorie vers cette nouvelle catégorie
    nouvelleCategorie.elements.push(
      this.categories[indexCategorie].elements[indexElement]
    );

    //supprimer l'element de l'ancienne catégorie
    this.categories[indexCategorie].elements.splice(indexElement, 1);

    this.sauvegarde();
  }

  onClicBoutonSupprimeElement(indexCategorie: number, indexElement: number) {
    this.categories[indexCategorie].elements.splice(indexElement, 1);

    this.sauvegarde();
  }

  sauvegarde() {
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }

  onClicAjouterCategorie() {
    this.categories.push({
      titre: this.saisieInputCategorie,
      elements: [],
    });

    this.saisieInputCategorie = '';

    this.sauvegarde();
  }

  onClicBoutonSupprimeCategorie(indexCategorie: number) {
    //on recherche la catégorie qui recuperera les
    //potentiels element de la catégorie que l'on supprime
    const nouvelleCategorie =
      indexCategorie == 0
        ? this.categories[indexCategorie + 1]
        : this.categories[indexCategorie - 1];

    //on fusionne les éléments
    nouvelleCategorie.elements = [
      ...nouvelleCategorie.elements,
      ...this.categories[indexCategorie].elements,
    ];

    //on supprime la catégorie
    this.categories.splice(indexCategorie, 1);

    this.sauvegarde();
  }
}
