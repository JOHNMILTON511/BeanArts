import { Component, afterNextRender, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Hero } from '../hero/hero';
import Aos from 'aos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    MatButtonModule,
    RouterModule,
    Hero,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        Aos.init({
          once: true,
          duration: 700,
          easing: 'ease-out',
        });

        // Smooth scroll works only in browser
        this.router.events.subscribe(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
    });
  }

  // -------------------------------
  // HERO SLIDER SETTINGS
  // -------------------------------
  heroCarouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    dots: true,
    nav: false,
    navSpeed: 600,
    autoplay: true,
    autoplayTimeout: 3200,
    autoplayHoverPause: true,
    responsive: { 0: { items: 1 }, 600: { items: 1 }, 900: { items: 1 } }
  };

  slides = [
    {
      id: 1,
      imgSrc: 'assets/New/5.jpg',
      title: 'Gifting That Speaks Gratitude',
      subtitle: 'Celebrate people. Strengthen connections'
    },
    {
      id: 2,
      imgSrc: 'assets/New/2.jpg',
      title: 'Elevate Every Occasion',
      subtitle: 'From onboarding to milestones — make every moment memorable'
    },
    {
      id: 3,
      imgSrc: 'assets/Slider/3.jpg',
      title: 'Smart. Stylish. Memorable',
      subtitle: 'Corporate gifts crafted to impress and inspire'
    }
  ];

  // -------------------------------
  // SERVICES SECTION
  // -------------------------------
  servicesList = [
    {
      img: 'assets/services/2.jpg',
      title: 'Corporate Gifting',
      description: 'Tailored gifting solutions to make a lasting impression on your clients, employees, and partners.',
      buttonText: 'Learn More',
      link: '/services',
      colorClass: 'text-blue-600'
    },
    {
      img: 'assets/services/5.jpg',
      title: 'Printing Services',
      description: 'High-quality prints for brochures, banners, business cards, and more, ensuring your brand stands out.',
      buttonText: 'Explore Printing',
      link: '/services',
      colorClass: 'text-green-600'
    },
    {
      img: 'assets/services/3.jpg',
      title: 'Customized Packaging',
      description: 'Elegant and functional packaging solutions that enhance product presentation.',
      buttonText: 'See Options',
      link: '/services',
      colorClass: 'text-yellow-600'
    }
  ];

  // -------------------------------
  // GALLERY SLIDER SETTINGS
  // -------------------------------
  galleryCarouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    nav: false,
    navSpeed: 1800,
    autoplay: true,
    autoplayTimeout: 2600,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      500: { items: 2 },
      900: { items: 3 }
    }
  };

  galleryImages = [
    {
      src: 'assets/services/5.jpg',
      alt: 'Crafting Every Detail',
      title: 'Crafting Every Detail',
      caption: 'Where premium gifts take shape with precision and care.'
    },
    {
      src: 'assets/gallery/2.jpg',
      alt: 'Thoughtful Packaging',
      title: 'Thoughtful Packaging',
      caption: 'Curated unboxing experiences that leave a lasting impression.'
    },
    {
      src: 'assets/gallery/3.jpg',
      alt: 'Celebrating Every Moment',
      title: 'Celebrating Every Moment',
      caption: 'Making corporate milestones meaningful.'
    },
    {
      src: 'assets/gallery/4.jpg',
      alt: 'Gifting That Inspires',
      title: 'Gifting That Inspires',
      caption: 'Unique collections curated to elevate appreciation.'
    },
    {
      src: 'assets/gallery/5.jpg',
      alt: 'Premium Hamper Setups',
      title: 'Premium Hamper Setups',
      caption: 'Elegant arrangements for festive gifting.'
    },
    {
      src: 'assets/gallery/6.jpg',
      alt: 'Behind the Scenes',
      title: 'Behind the Scenes',
      caption: 'Creativity and craftsmanship brought to life.'
    }
  ];
}
