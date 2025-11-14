import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-home',
  imports: [
    CarouselModule,
    MatButtonModule,
    RouterModule
    ],
  templateUrl: './home.html',
  styleUrl: './home.css',
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
      imgSrc: 'New/5.jpg',
      title: 'Gifting That Speaks Gratitude',
      subtitle: 'Celebrate people. Strengthen connections'
    },
    {
      id: 2,
      imgSrc: 'New/2.jpg',
      title: 'Elevate Every Occasion',
      subtitle: 'From onboarding to milestones — make every moment memorable'
    },
    {
      id: 3,
      imgSrc: 'Slider/3.jpg',
      title: 'Smart. Stylish. Memorable',
      subtitle: 'Corporate gifts crafted to impress and inspire'
    }
  ];

  servicesList = [
  {
    img: 'services/2.jpg',
    title: 'Corporate Gifting',
    description:
      'Tailored gifting solutions to make a lasting impression on your clients, employees, and partners.',
    buttonText: 'Learn More',
    colorClass: 'text-blue-600',
    link: '/services'
  },
  {
    img: 'services/5.jpg',
    title: 'Printing Services',
    description:
      'High-quality prints for brochures, banners, business cards, and more, ensuring your brand stands out.',
    buttonText: 'Explore Printing',
    colorClass: 'text-green-600',
    link: '/services'
  },
  {
    img: 'services/3.jpg',
    title: 'Customized Packaging',
    description:
      'Elegant and functional packaging solutions that reflect your brand’s values and enhance product presentation.',
    buttonText: 'See Options',
    colorClass: 'text-yellow-600',
    link: '/services'
  }
];

  
}
