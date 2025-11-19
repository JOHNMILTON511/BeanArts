import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {

  constructor(private meta: Meta, private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Our Story & Vision | BeanArts Corporate Gifting');

    this.meta.updateTag({ 
      name: 'description', 
      content: 'Learn about BeanArts, India\'s premier corporate gifting partner. Founded in 2018, we specialize in sustainable, high-quality custom branding and global logistics.' 
    });

    this.meta.updateTag({ 
      name: 'keywords', 
      content: 'BeanArts Story, Corporate Gifting Company Profile, Sustainable Gifting India, Custom Packaging Company' 
    });
  }
}