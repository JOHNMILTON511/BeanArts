import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-home',
  imports: [CarouselModule  ],
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

  
}
