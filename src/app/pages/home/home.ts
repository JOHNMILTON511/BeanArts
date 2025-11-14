import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  heroCarouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      900: {
        items: 1
      }
    },
    nav: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true
  };

  // Slides array (used in @for)
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
  servicesList = [
    {
      img: 'assets/services/2.jpg',
      title: 'Corporate Gifting',
      description:
        'Tailored gifting solutions to make a lasting impression on your clients, employees, and partners.',
      buttonText: 'Learn More',
      colorClass: 'text-blue-600',
      link: '/services'
    },
    {
      img: 'assets/services/5.jpg',
      title: 'Printing Services',
      description:
        'High-quality prints for brochures, banners, business cards, and more, ensuring your brand stands out.',
      buttonText: 'Explore Printing',
      colorClass: 'text-green-600',
      link: '/services'
    },
    {
      img: 'assets/services/3.jpg',
      title: 'Customized Packaging',
      description:
        'Elegant and functional packaging solutions that reflect your brand’s values and enhance product presentation.',
      buttonText: 'See Options',
      colorClass: 'text-yellow-600',
      link: '/services'
    }
  ];

  galleryCarouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 2000,
    navText: ['', ''],
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      900: { items: 3 }
    },
    nav: false,
    autoplay: true,
    autoWidth: true,
    autoplayTimeout: 2500,
    autoplayHoverPause: true
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
      caption: 'From onboarding to milestones — we make every gesture meaningful.'
    },
    {
      src: 'assets/gallery/4.jpg',
      alt: 'Gifting That Inspires',
      title: 'Gifting That Inspires',
      caption: 'Unique collections curated to elevate corporate appreciation.'
    },
    {
      src: 'assets/gallery/5.jpg',
      alt: 'Premium Hamper Setups',
      title: 'Premium Hamper Setups',
      caption: 'Elegant arrangements designed for festive and executive gifting.'
    },
    {
      src: 'assets/gallery/6.jpg',
      alt: 'Behind the Scenes',
      title: 'Behind the Scenes',
      caption: 'Our team bringing creativity and craftsmanship to life.'
    },
    {
      src: 'assets/gallery/7.jpg',
      alt: 'Custom Branding Solutions',
      title: 'Custom Branding Solutions',
      caption: 'Tailored gifts with your identity beautifully integrated.'
    },
    {
      src: 'assets/gallery/8.jpg',
      alt: 'End-to-End Gifting Service',
      title: 'End-to-End Gifting Service',
      caption: 'From selection to delivery — we handle everything seamlessly.'
    },
    {
      src: 'assets/gallery/9.jpg',
      alt: 'Memorable Corporate Events',
      title: 'Memorable Corporate Events',
      caption: 'Gifting solutions perfectly aligned for conferences and celebrations.'
    },
    {
      src: 'assets/gallery/10.jpg',
      alt: 'Moments of Appreciation',
      title: 'Moments of Appreciation',
      caption: 'Capturing smiles created through meaningful corporate gestures.'
    }
  ];

}
