import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-home',
  imports: [CarouselModule,
    MatButtonModule
    ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  heroCarouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
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
      imgSrc: 'Slider/1.jpg',
      title: 'Discover Creativity',
      subtitle: 'Where art meets imagination'
    },
    {
      id: 2,
      imgSrc: 'Slider/2.jpg',
      title: 'Modern Expression',
      subtitle: 'Experience the fusion of art and technology'
    },
    {
      id: 3,
      imgSrc: 'Slider/3.jpg',
      title: 'Timeless Beauty',
      subtitle: 'Capturing emotions through every stroke'
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
