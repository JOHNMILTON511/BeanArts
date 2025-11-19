import { ChangeDetectionStrategy, Component, signal, OnInit } from '@angular/core';
import { SvgIcon } from './svg-icon/svg-icon';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    SvgIcon,
    CommonModule,
    RouterModule,
    NgOptimizedImage
  ],
  templateUrl: './services.html',
  styleUrls: ['./services.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Services implements OnInit {
  
  currentYear = signal(new Date().getFullYear());

  constructor(private meta: Meta, private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Our Services - Corporate Gifting, Printing & Custom Packaging | BeanArts');

    this.meta.updateTag({ 
      name: 'description', 
      content: 'Explore BeanArts\' comprehensive corporate solutions: Premium Employee Welcome Kits, High-Quality Business Printing, and Eco-Friendly Custom Packaging Design.' 
    });

    this.meta.updateTag({ 
      name: 'keywords', 
      content: 'Corporate Gifting Services, Bulk Printing Bangalore, Custom Packaging Design, Employee Swag Kits, Business Cards Printing, Eco-friendly Boxes' 
    });
  }

  processSteps = signal([
    {
      id: 1,
      title: 'Define & Discover',
      description: 'We begin with an in-depth consultation to map your objectives, understand your brand identity, and define the scope of the project.',
      icon: 'consultation',
      color: 'blue'
    },
    {
      id: 2,
      title: 'Design & Prototype',
      description: 'Our creative team customizes solutions, generating design mockups and prototypes for your approval, ensuring perfect brand alignment.',
      icon: 'customization',
      color: 'green'
    },
    {
      id: 3,
      title: 'Production & Quality',
      description: 'We move to production, using premium materials and rigorous quality checks to meticulously craft every product to the highest standards.',
      icon: 'delivery',
      color: 'yellow'
    },
    {
      id: 4,
      title: 'Fulfillment & Support',
      description: 'Your products are packaged, shipped safely, and delivered on time. We provide continuous post-delivery support and future planning.',
      icon: 'support',
      color: 'teal'
    },
  ]);

  features = signal([
    {
      id: 1,
      title: 'Unrivaled Quality Guarantee',
      description: 'We only use premium-grade materials and cutting-edge techniques to ensure every finished product is a masterpiece of durability and design.',
      icon: 'quality',
      color: 'sky'
    },
    {
      id: 2,
      title: 'Creative Innovation',
      description: 'Our team stays ahead of trends, offering innovative and unique solutions in gifting, printing, and packaging that make your brand stand out.',
      icon: 'innovation',
      color: 'fuchsia'
    },
    {
      id: 3,
      title: 'Dedicated Client Support',
      description: 'From initial concept to final delivery, you receive dedicated support and transparent communication, making the entire process seamless and stress-free.',
      icon: 'support',
      color: 'amber'
    },
    {
      id: 4,
      title: 'Reliable, On-Time Delivery',
      description: 'We understand deadlines. Our logistics ensure that your customized products are delivered precisely when and where you need them, nationwide.',
      icon: 'delivery',
      color: 'indigo'
    },
  ]);

  // Image assets injected into the data structure
  services = signal([
    {
      id: 1,
      name: 'Corporate Gifting Solutions',
      color: 'indigo',
      items: [
        {
          title: 'Premium Welcome Kits',
          description: 'Curated kits for new hires and client onboarding that make a powerful first impression.',
          imageUrl: 'assets/service/Premium_welcome_Kits.png',
          loaded: false
        },
        {
          title: 'Luxury Festive Hampers',
          description: 'Elegant, customizable hampers for employee and client celebrations during major holidays.',
          imageUrl: 'assets/service/Luxury_Festive_Hampers.png',
          loaded: false
        },
        {
          title: 'Branded Tech & Swag',
          description: 'High-quality, personalized tech accessories and branded merchandise to boost company pride.',
          imageUrl: 'assets/service/Branded_Tech_Swag.png',
          loaded: false
        },
        {
          title: 'Signature Scented Candles',
          description: 'Custom-branded, aromatic candles to create a sophisticated sensory experience.', imageUrl: 'assets/service/Signature_Scented_Candles.jpg', loaded: false
        }

      ]
    },
    {
      id: 2,
      name: 'Premium Printing Solutions',
      color: 'orange',
      items: [
        {
          title: 'Marketing Flyers & Brochures',
          description: 'High-quality, full-color prints designed to deliver your message with clarity and impact.',
          imageUrl: 'assets/service/flyer.jpg',
          loaded: false
        },
        {
          title: 'Professional Business Cards',
          description: 'Premium card stock with matte, glossy, embossed, or spot-UV finishes for a lasting first impression.',
          imageUrl: 'assets/service/Business_Cards.jpg',
          loaded: false
        },
        {
          title: 'Event Banners & Posters',
          description: 'Durable, high-resolution large-format prints ideal for events, conferences, and retail branding.',
          imageUrl: 'assets/service/Event_Banners.jpg',
          loaded: false
        },
        {
          title: 'Custom Corporate Stationery',
          description: 'Branded letterheads, envelopes, notepads, and office essentials that reflect your company identity.',
          imageUrl: 'assets/service/Custom_CorporateStationery.jpg',
          loaded: false
        }
      ]
    }
    ,
    {
      id: 3,
      name: 'Bespoke Packaging Design',
      color: 'teal',
      items: [
        { title: 'Eco-Friendly Mailer Boxes', description: 'Sustainable, custom-sized corrugated boxes perfect for safe and environmentally conscious shipping.', imageUrl: 'assets/service/Eco-Friendly_Mailer_Boxes.jpg', loaded: false },
        { title: 'Retail Product Packaging', description: 'Unique structural and graphic design that maximizes shelf appeal and product protection.', imageUrl: 'assets/service/Retail_Product_Packaging.jpg', loaded: false },
        { title: 'Premium Rigid Boxes', description: 'High-end, durable boxes with magnetic closures or foam inserts for luxury items and gifts.', imageUrl: 'assets/service/Premium_Rigid_Boxes.jpg', loaded: false },
        { title: 'Custom Branded Tapes & Labels', description: 'The final touch: personalized tapes and labels for sealing and security with visual flair.', imageUrl: 'assets/service/Custom_Branded.jpg', loaded: false }
      ]
    }
  ]);

  imageLoadedState: { [key: string]: boolean } = {};

  onImageLoad(itemId: string) {
    this.imageLoadedState[itemId] = true;}
}