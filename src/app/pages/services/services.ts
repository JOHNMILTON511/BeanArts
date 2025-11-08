import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SvgIcon } from './svg-icon/svg-icon';

@Component({
  selector: 'app-services',
  imports: [
    SvgIcon
  ],
  templateUrl: './services.html',
  styleUrl: './services.css',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Services {
  currentYear = signal(new Date().getFullYear());

  // Dynamic Data Definitions
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
      name: 'Corporate Gifting Solutions',
      color: 'indigo',
      items: [
        { title: 'Premium Welcome Kits', description: 'Curated kits for new hires and client onboarding that make a powerful first impression.', imageUrl: 'services/1.jpg' },
        { title: 'Luxury Festive Hampers', description: 'Elegant, customizable hampers for employee and client celebrations during major holidays.', imageUrl: 'image_340be3.png' },
        { title: 'Branded Tech & Swag', description: 'High-quality, personalized tech accessories and branded merchandise to boost company pride.', imageUrl: 'image_35f803.png' },
        { title: 'Signature Scented Candles', description: 'Custom-branded, aromatic candles to create a sophisticated sensory experience.', imageUrl: 'image_37bde3.png' }
      ]
    },
    {
      name: 'High-Impact Printing Services',
      color: 'orange',
      items: [
        { title: 'Vivid Marketing Flyers', description: 'Full-color, double-sided flyers and leaflets for targeted promotional campaigns.', imageUrl: 'image_381c16.png' },
        { title: 'Executive Business Cards', description: 'Premium paper stock, embossed, or spot UV finishing for distinctive business cards.', imageUrl: 'https://placehold.co/400x300/f3e5f5/4a148c?text=Business+Cards' },
        { title: 'Large Format Banners', description: 'Durable, high-resolution posters and retractable banners for events and storefronts.', imageUrl: 'https://placehold.co/400x300/e1f5fe/01579b?text=Banners+%26+Posters' },
        { title: 'Custom Branded Stationery', description: 'Letterheads, envelopes, and notepads consistent with your corporate identity.', imageUrl: 'https://placehold.co/400x300/f9fbe7/689f38?text=Stationery' }
      ]
    },
    {
      name: 'Bespoke Packaging Design',
      color: 'teal',
      items: [
        { title: 'Eco-Friendly Mailer Boxes', description: 'Sustainable, custom-sized corrugated boxes perfect for safe and environmentally conscious shipping.', imageUrl: 'https://placehold.co/400x300/e0f7fa/006064?text=Eco+Mailer+Boxes' },
        { title: 'Retail Product Packaging', description: 'Unique structural and graphic design that maximizes shelf appeal and product protection.', imageUrl: 'https://placehold.co/400x300/f0f4c3/827717?text=Retail+Boxes' },
        { title: 'Premium Rigid Boxes', description: 'High-end, durable boxes with magnetic closures or foam inserts for luxury items and gifts.', imageUrl: 'https://placehold.co/400x300/fce4ec/ad1457?text=Luxury+Packaging' },
        { title: 'Custom Branded Tapes & Labels', description: 'The final touch: personalized tapes and labels for sealing and security with visual flair.', imageUrl: 'https://placehold.co/400x300/ffebee/d32f2f?text=Tapes+%26+Labels' }
      ]
    }
  ]);
}
