import { User } from './../../components/interface/User';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isUserLogged = false;
  user: User | undefined;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // TODO: verify if the user is logged, otherwise show the login btn
    this.authService.isUserLogged.subscribe(() => {
      this.authService.getUser().subscribe((user: User) => this.user = user);
      if(this.user && this.user.id) {
        this.isUserLogged = true;
      }
    });

    this.authService.getUser().subscribe((user: User) => this.user = user);
      if(this.user && this.user.id) {
        this.isUserLogged = true;
      }

      this.authService.isUserModified.subscribe(() => {
        this.authService.getUser().subscribe((user: User) => this.user = user);
      });
  }

  login() {
    this.router.navigate(['/sign-in']);
  }

  register() {
    this.router.navigate(['/sign-up']);
  }

  profile(): void {
    this.router.navigate(['/profile' , this.user?.id]);
  }

}
