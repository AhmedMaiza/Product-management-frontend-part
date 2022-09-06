import { Component, OnInit } from '@angular/core';
import { Categorie } from '../model/categorie.model';
import { ProduitService } from '../service/produit.service';

@Component({
  selector: 'app-liste-categories',
  templateUrl: './liste-categories.component.html',
  styles: [
  ]
})
export class ListeCategoriesComponent implements OnInit {

  categories!: Categorie[];

  updatedCat:Categorie = {"idCat":0,"nomCat":""};

  ajout:boolean=true;


  constructor(private produitService: ProduitService) { }
  ngOnInit(): void {

   this.chargerCategories();
  

  }

  categorieUpdated(cat:Categorie){
    console.log("Cat updated event",cat);
    this.produitService.ajouterCategorie(cat).
     subscribe( ()=> this.chargerCategories());
    }

    chargerCategories(){
      this.produitService.listeCategories().
      subscribe(cats => {this.categories = cats._embedded.categories;
      console.log(cats);
      });
      }

      updateCat(cat:Categorie) {
        this.updatedCat=cat;
        this.ajout=false; 
        }

        supprimerCategorie(cat:Categorie){ 
          let conf = confirm("Etes-vous sûr ?");
           if (conf)
            this.produitService.supprimerCategorie(cat.idCat).subscribe(() => {
             console.log("categorie supprimé");
             this.chargerCategories();//pour le refresh
      });
        }
    

}
