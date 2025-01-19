import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {MatSidenav, MatSidenavContainer} from '@angular/material/sidenav';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatToolbar} from '@angular/material/toolbar';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatSidenavContainer,
    MatIcon,
    MatIconButton,
    MatNavList,
    MatSidenav,
    MatListItem,
    RouterLink,
    RouterLinkActive,
    MatButton,
    MatToolbar,
    NgIf
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  sidenavOpened = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }


  toggleMenu() {
    this.sidenavOpened = !this.sidenavOpened;
  }

  isAuthenticated() {
    return this.authService.isAuthenticated()
  }

  logout(){
    return this.authService.logout();
  }

}
