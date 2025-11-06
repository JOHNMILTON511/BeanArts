import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,   
    MatMenuModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  navItems = [
    { label: 'Home', link: '/' },
    { label: 'About', link: '/about' },
    { label: 'Services', link: '/services' },
    { label: 'Contact', link: '/contact' },
  ];
}
