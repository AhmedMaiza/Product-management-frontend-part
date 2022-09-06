import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { AuthService } from '../service/auth.service';
import { ProduitService } from '../service/produit.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html'
})
export class ProduitsComponent implements OnInit {

  produits?: Produit[];

  constructor(private produitService: ProduitService, public authService: AuthService) {

  }

  ngOnInit(): void {
    this.chargerProduits();
  }

  chargerProduits() {
    this.produitService.listeProduit().subscribe(prods => {
      console.log(prods);
      this.produits = prods;
    });
  }

  supprimerProduit(p: Produit) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.produitService.supprimerProduit(p.idProduit).subscribe(() => {
        console.log("produit supprimé");
        this.chargerProduits();//pour le refresh
      });
  }


}
