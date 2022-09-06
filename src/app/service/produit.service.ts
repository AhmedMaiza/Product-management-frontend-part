import { Injectable } from '@angular/core';
import { Produit } from '../model/produit.model';
import { Categorie } from '../model/categorie.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategorieWrapper } from '../model/CategorieWrapped';
import { AuthService } from './auth.service';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }; //donnéé retourner est de type json

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  produits: Produit[];

  produit!: Produit;

  categories: Categorie[];

  apiURL: string = 'http://localhost:8080/produits/api';

  apiURLCat: string = 'http://localhost:8080/produits/cat';
  constructor(private http: HttpClient, private authService: AuthService) {

    /* this.categories = [{ idCat: 1, nomCat: "PC" },
     { idCat: 2, nomCat: "Imprimante" }];
 
     this.produits = [
       {
         idProduit: 1, nomProduit: "PC Asus", prixProduit: 3000.600,
         dateCreation: new Date("01/14/2011"), categorie: { idCat: 1, nomCat: "PC" }
       },
       {
         idProduit: 2, nomProduit: "Imprimante Epson", prixProduit: 450,
         dateCreation: new Date("12/17/2010"), categorie: { idCat: 2, nomCat: "Imprimante" }
       },
       {
         idProduit: 3, nomProduit: "Tablette Samsung", prixProduit: 900.123,
         dateCreation: new Date("02/20/2020"), categorie: { idCat: 1, nomCat: "PC" }
       }];
       
       http pour faire appel aux api*/
  }

  listeProduit(): Observable<Produit[]> {
    
     return this.http.get<Produit[]>(this.apiURL + "/all");
  }

  ajouterProduit(prod: Produit): Observable<Produit> {
    
    return this.http.post<Produit>(this.apiURL, prod);
  }


  supprimerProduit(id: number) {
    const url = `${this.apiURL}/${id}`;
   
    return this.http.delete(url);
  }

  consulterProduit(id: number): Observable<Produit> {
    const url = `${this.apiURL}/${id}`;
   
    return this.http.get<Produit>(url);
  }
  updateProduit(prod: Produit): Observable<Produit> {
    
    return this.http.put<Produit>(this.apiURL, prod);
  }



  trierProduits() {
    this.produits = this.produits.sort((n1, n2) => {
      if (n1.idProduit > n2.idProduit) {
        return 1;
      }
      if (n1.idProduit < n2.idProduit) {
        return -1;
      }
      return 0;
    });
  }

  listeCategories():Observable<CategorieWrapper>{

   return this.http.get<CategorieWrapper>(this.apiURLCat);
} 

  consulterCategorie(id: number): Categorie {
    return this.categories.find(cat => cat.idCat == id)!;
  }


  rechercherParCategorie(idCat: number): Observable<Produit[]> {
    const url = `${this.apiURL}/prodscat/${idCat}`;
    return this.http.get<Produit[]>(url);
  }

  rechercherParNom(nom: string): Observable<Produit[]> {
    const url = `${this.apiURL}/prodsByName/${nom}`;
    return this.http.get<Produit[]>(url);
  }

  ajouterCategorie(cat: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.apiURLCat, cat, httpOptions);
  }

  supprimerCategorie(id: number) {
    const url = `${this.apiURLCat}/${id}`;
    return this.http.delete(url, httpOptions);
  }




}
