import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import * as Aos from 'aos'; // Import AOS

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

  constructor(
    private meta: Meta, 
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // 1. Initialize AOS (fixes lag)
    if (isPlatformBrowser(this.platformId)) {
      Aos.init({
        duration: 400, // Fast 400ms transition
        once: true,
        easing: 'ease-out-quart',
        offset: 50
      });
    }

    // 2. SEO Tags
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