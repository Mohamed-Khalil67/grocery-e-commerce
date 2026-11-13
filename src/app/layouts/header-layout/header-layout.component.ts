import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';

/** Top of every page: info bar + navbar. */
@Component({
  imports: [NavbarComponent],
  selector: 'app-header-layout',
  styleUrl: './header-layout.component.css',
  templateUrl: './header-layout.component.html',
})
export class HeaderLayoutComponent {}
