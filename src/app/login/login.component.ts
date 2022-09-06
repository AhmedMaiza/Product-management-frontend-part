import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  user = new User();
  erreur: number=0;


  constructor(private authService : AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onLoggedin(){
    this.authService.login(this.user).subscribe({
      next: (data) => {
      let jwToken = data.headers.get('Authorization')!;
      this.authService.saveToken(jwToken);
      this.router.navigate(['/']);
      },
      error: (erreur: any) => {
      this.erreur = 1;
      }
      });
    }
      

}
