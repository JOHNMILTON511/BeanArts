import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Added CommonModule
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule, 
    RouterModule
  ],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound implements OnInit {

  constructor(private meta: Meta, private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Page Not Found (404) | BeanArts');

    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
  }
}