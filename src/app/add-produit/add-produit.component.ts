import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../service/produit.service';
import { Categorie } from '../model/categorie.model';


@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.css']
})
export class AddProduitComponent implements OnInit {

  categories!: Categorie[];

  newProduit = new Produit();

  newIdCat!: number;

  newCategorie!: Categorie;

  constructor(private produitService: ProduitService, private router: Router) { }

  ngOnInit(): void {
    this.produitService.listeCategories().
      subscribe(cats => {
        console.log(cats);
        this.categories = cats._embedded.categories;
      }
      );
  }

  addProduit() {
    this.newProduit.categorie = this.categories.find(cat => cat.idCat == this.newIdCat)!;
    this.produitService.ajouterProduit(this.newProduit)
      .subscribe(prod => {
        console.log(prod);
        this.router.navigate(['produits']);
      });
  }



}
