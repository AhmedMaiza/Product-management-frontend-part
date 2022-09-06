import { Component, OnInit } from '@angular/core';
import { Categorie } from '../model/categorie.model';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../service/produit.service';


@Component({
  selector: 'app-recherche-par-categorie',
  templateUrl: './recherche-par-categorie.component.html',
  styles: [
  ]
})
export class RechercheParCategorieComponent implements OnInit {


  produits!: Produit[];
  IdCategorie!: number;
  categories!: Categorie[];

  constructor(private produitService: ProduitService) { }

  ngOnInit(): void {

    this.chargerProduits();

    this.produitService.listeCategories().
      subscribe(cats => {
        this.categories = cats._embedded.categories;
        console.log(cats);
      });
  }

  onChange() {
    this.produitService.rechercherParCategorie(this.IdCategorie).
    subscribe(prods =>{this.produits=prods});
    }

    chargerProduits() {
      this.produitService.listeProduit().subscribe(prods => {
        console.log(prods);
        this.produits = prods;
      });
    }

}
