import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../service/produit.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: [
  ]
})
export class RechercheParNomComponent implements OnInit {

  constructor(private produitService: ProduitService) { }

  produits!: Produit[];
  nomProduit!: string;

  allProduits! : Produit[];
  searchTerm!: string;

  ngOnInit(): void {

    this.chargerProduits();

    this.produitService.listeProduit().subscribe(prods => {
      console.log(prods);
      this.allProduits = prods;
      });
  }


  rechercherProds(){
    this.produitService.rechercherParNom(this.nomProduit).
    subscribe(prods => {
    this.produits = prods;
    console.log(prods)});
    }

    onKeyUp(filterText : string){
      this.produits = this.allProduits.filter(item =>
      item.nomProduit.toLowerCase().includes(filterText));
      }

      chargerProduits() {
        this.produitService.listeProduit().subscribe(prods => {
          console.log(prods);
          this.produits = prods;
        });
      }
  

}
