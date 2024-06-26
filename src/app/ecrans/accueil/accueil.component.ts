import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

declare type Categorie = {
  titre: string;
  elements: string[];
  edite: boolean;
};

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss',
})
export class AccueilComponent {
  categories: Categorie[] = [];

  saisieInputUrl: string = '';

  saisieInputCategorie: string = '';

  ngOnInit() {
    const jsonCategories = localStorage.getItem('categories');

    if (jsonCategories) {
      this.categories = JSON.parse(jsonCategories);
    } else {
      this.categories = [
        { titre: 'Top', elements: [], edite: false },
        { titre: 'Bien', elements: [], edite: false },
        { titre: 'Moyen', elements: [], edite: false },
        { titre: 'Nul', elements: [], edite: false },
        { titre: 'Horrible', elements: [], edite: false },
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
      edite: false,
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

  onEntreeInput(categorie: Categorie, evenement: any) {
    //on enleve l'edtion de la potentielle catégorie actuelle en
    //reinitialisdant toutes les propriétés "edite"
    this.categories.forEach((categorie) => (categorie.edite = false));

    //on ne change que celle qui a été double cliquée
    categorie.edite = true;

    //on recupere l'element clique (header / span)
    const elementClique = evenement.target;

    const enTete = elementClique.closest(".en-tete")

    const input = enTete.querySelector('input');

    input.focus();
  }

  onSortieInput(categorie: Categorie) {
    categorie.edite = false;
    this.sauvegarde();
  }

  onKeyUp(evenement: KeyboardEvent, categorie: Categorie) {
    if (evenement.code == 'Enter' || evenement.code == 'Escape') {
      this.onSortieInput(categorie);
    }
  }
}
