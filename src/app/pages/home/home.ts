import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule, NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Hero } from '../hero/hero'; // You might remove this if you use the slider in HTML
import * as Aos from 'aos'; // Import AOS

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    MatButtonModule,
    RouterModule,
    Hero, 
    NgOptimizedImage
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    // FIX: Initialize AOS with 400ms duration for snappy, non-laggy animations
    if (isPlatformBrowser(this.platformId)) {
      Aos.init({
        duration: 400,
        once: true,
        easing: 'ease-out-quart',
        offset: 50
      });
    }
  }

  // --- NEW: Stats for Credibility ---
  stats = [
    { label: 'Happy Clients', value: '500+', icon: 'fas fa-smile' },
    { label: 'Kits Delivered', value: '10k+', icon: 'fas fa-box-open' },
    { label: 'Quality Check', value: '100%', icon: 'fas fa-check-circle' },
    { label: 'Pan India', value: '24/7', icon: 'fas fa-map-marker-alt' }
  ];

  // --- NEW: Testimonials ---
  testimonials = [
    {
      text: "The onboarding kits were a massive hit! The quality of the hoodies and the packaging was premium. Highly recommended.",
      author: "Sarah J.",
      role: "HR Director, TechCorp",
      initial: "S"
    },
    {
      text: "BeanArts handled our Diwali gifting for 2000+ employees seamlessly. The logistics were flawless.",
      author: "Rahul M.",
      role: "Operations Head, FinServe",
      initial: "R"
    },
    {
      text: "Their design team really understood our brand. The custom rigid boxes came out looking exactly like the mockups.",
      author: "Anita D.",
      role: "Marketing Lead, LuxeCo",
      initial: "A"
    }
  ];

  // Hero Slider
  heroCarouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    dots: true,
    nav: false,
    navSpeed: 600,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    animateOut: 'fadeOut', // Adds a nice fade effect between slides
    responsive: { 0: { items: 1 }, 600: { items: 1 }, 900: { items: 1 } }
  };

  slides = [
    {
      id: 1,
      imgSrc: 'assets/New/5.jpg',
      title: 'Gifting That Speaks Gratitude',
      subtitle: 'Celebrate people. Strengthen connections.'
    },
    {
      id: 2,
      imgSrc: 'assets/New/2.jpg',
      title: 'Elevate Every Occasion',
      subtitle: 'From onboarding to milestones — make every moment memorable.'
    },
    {
      id: 3,
      imgSrc: 'assets/Slider/3.jpg',
      title: 'Smart. Stylish. Memorable',
      subtitle: 'Corporate gifts crafted to impress and inspire.'
    }
  ];

  // Services List
  servicesList = [
    {
      img: 'assets/services/2.jpg',
      title: 'Corporate Gifting',
      description: 'Tailored gifting solutions to make a lasting impression on your clients, employees, and partners.',
      buttonText: 'View Catalog',
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

  // Gallery
  galleryCarouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    nav: false,
    navSpeed: 800,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      500: { items: 2 },
      900: { items: 3 }
    }
  };

  galleryImages = [
    { src: 'assets/services/5.jpg', alt: 'Crafting Every Detail', title: 'Crafting Every Detail', caption: 'Where premium gifts take shape with precision and care.' },
    { src: 'assets/gallery/2.jpg', alt: 'Thoughtful Packaging', title: 'Thoughtful Packaging', caption: 'Curated unboxing experiences that leave a lasting impression.' },
    { src: 'assets/gallery/3.jpg', alt: 'Celebrating Every Moment', title: 'Celebrating Every Moment', caption: 'Making corporate milestones meaningful.' },
    { src: 'assets/gallery/4.jpg', alt: 'Gifting That Inspires', title: 'Gifting That Inspires', caption: 'Unique collections curated to elevate appreciation.' },
    { src: 'assets/gallery/5.jpg', alt: 'Premium Hamper Setups', title: 'Premium Hamper Setups', caption: 'Elegant arrangements for festive gifting.' },
    { src: 'assets/gallery/6.jpg', alt: 'Behind the Scenes', title: 'Behind the Scenes', caption: 'Creativity and craftsmanship brought to life.' }
  ];
}