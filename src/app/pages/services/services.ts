import {
  ChangeDetectionStrategy,
  Component,
  signal,
  OnInit,
  AfterViewInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterModule, MatIconModule, MatButtonModule],
  templateUrl: './services.html',
  styleUrls: ['./services.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Services implements OnInit, AfterViewInit, OnDestroy {
  private meta     = inject(Meta);
  private title    = inject(Title);
  private platformId = inject(PLATFORM_ID);
  private observer!: IntersectionObserver;

  // ── Active service tab (for mobile scroll navigation) ───────
  activeService = signal(0);

  // ── Stats ────────────────────────────────────────────────────
  stats = signal([
    { label: 'Happy Clients',       value: '500+',  icon: 'groups',             faIcon: 'fa-smile' },
    { label: 'Projects Delivered',  value: '2K+',   icon: 'inventory_2',        faIcon: 'fa-box-open' },
    { label: 'Years Experience',    value: '8+',    icon: 'workspace_premium',  faIcon: 'fa-star' },
    { label: 'Cities Covered',      value: '50+',   icon: 'location_on',        faIcon: 'fa-map-marker-alt' },
  ]);

  // ── Features / Why Us ────────────────────────────────────────
  features = signal([
    {
      id: 1,
      title: 'Unrivaled Quality Guarantee',
      description: 'Premium-grade materials and cutting-edge techniques ensure every finished product is a masterpiece of durability and design.',
      icon: 'workspace_premium',
      accent: '#4f46e5',
      accentBg: 'rgba(79,70,229,0.08)',
    },
    {
      id: 2,
      title: 'Creative Innovation',
      description: 'Our team stays ahead of trends, offering innovative solutions in gifting, printing, and packaging that make your brand truly stand out.',
      icon: 'palette',
      accent: '#7c3aed',
      accentBg: 'rgba(124,58,237,0.08)',
    },
    {
      id: 3,
      title: 'Dedicated Client Support',
      description: 'From initial concept to final delivery — a dedicated account manager keeps communication transparent and the process seamless.',
      icon: 'support_agent',
      accent: '#d97706',
      accentBg: 'rgba(217,119,6,0.08)',
    },
    {
      id: 4,
      title: 'Reliable, On-Time Delivery',
      description: 'We understand deadlines. Our logistics ensure products are delivered precisely when and where you need them, nationwide.',
      icon: 'local_shipping',
      accent: '#059669',
      accentBg: 'rgba(5,150,105,0.08)',
    },
  ]);

  // ── Process Steps ────────────────────────────────────────────
  processSteps = signal([
    {
      id: '01',
      title: 'Define & Discover',
      description: 'In-depth consultation to map your objectives, understand your brand identity, and define the full scope of the project.',
      icon: 'chat_bubble_outline',
    },
    {
      id: '02',
      title: 'Design & Prototype',
      description: 'Our creative team generates design mockups and physical prototypes for your approval, ensuring perfect brand alignment.',
      icon: 'design_services',
    },
    {
      id: '03',
      title: 'Production & Quality',
      description: 'Premium materials and rigorous QC checks at every stage to meticulously craft each product to our uncompromising standards.',
      icon: 'precision_manufacturing',
    },
    {
      id: '04',
      title: 'Fulfillment & Support',
      description: 'Products are packaged, shipped safely, and delivered on time. Continuous post-delivery support and future planning included.',
      icon: 'local_shipping',
    },
  ]);

  // ── Services (your exact data, enhanced) ────────────────────
  services = signal([
    {
      id: 1,
      name: 'Corporate Gifting Solutions',
      slug: 'gifting',
      icon: 'card_giftcard',
      description: 'Curated, branded gift collections that celebrate milestones, reward excellence, and forge lasting connections with clients and employees.',
      accentFrom: '#7c3aed',
      accentTo:   '#4f46e5',
      badgeColor: 'bg-violet-50 text-violet-700 border-violet-100',
      badge: 'Most Popular',
      items: [
        {
          title: 'Premium Welcome Kits',
          description: 'Curated kits for new hires and client onboarding that make a powerful, lasting first impression.',
          imageUrl: 'assets/service/Premium_welcome_Kits.png',
          imgWidth: 400, imgHeight: 300,
        },
        {
          title: 'Luxury Festive Hampers',
          description: 'Elegant, customisable hampers for employee and client celebrations during major festivals and milestones.',
          imageUrl: 'assets/service/Luxury_Festive_Hampers.png',
          imgWidth: 400, imgHeight: 300,
        },
        {
          title: 'Branded Tech & Swag',
          description: 'High-quality, personalised tech accessories and branded merchandise to reinforce company culture.',
          imageUrl: 'assets/service/Branded_Tech_Swag.png',
          imgWidth: 400, imgHeight: 300,
        },
        {
          title: 'Signature Scented Candles',
          description: 'Custom-branded, aromatic candles that create a sophisticated sensory experience for premium gifting.',
          imageUrl: 'assets/service/Signature_Scented_Candles.jpg',
          imgWidth: 400, imgHeight: 300,
        },
      ],
    },
    {
      id: 2,
      name: 'Premium Printing Solutions',
      slug: 'printing',
      icon: 'print',
      description: 'From business cards to grand-format banners — every print handled with precision, vibrant colour accuracy, and premium finishes.',
      accentFrom: '#2563eb',
      accentTo:   '#4f46e5',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-100',
      badge: 'High Demand',
      items: [
        {
          title: 'Marketing Flyers & Brochures',
          description: 'High-quality, full-colour prints designed to deliver your message with absolute clarity and visual impact.',
          imageUrl: 'assets/service/flyer.jpg',
          imgWidth: 400, imgHeight: 300,
        },
        {
          title: 'Professional Business Cards',
          description: 'Premium card stock with matte, glossy, embossed, or spot-UV finishes for a lasting first impression.',
          imageUrl: 'assets/service/Business_Cards.jpg',
          imgWidth: 400, imgHeight: 300,
        },
        {
          title: 'Event Banners & Posters',
          description: 'Durable, high-resolution large-format prints ideal for events, conferences, and retail environments.',
          imageUrl: 'assets/service/Event_Banners.jpg',
          imgWidth: 400, imgHeight: 300,
        },
        {
          title: 'Custom Corporate Stationery',
          description: 'Branded letterheads, envelopes, notepads, and office essentials that reinforce your corporate identity.',
          imageUrl: 'assets/service/Custom_CorporateStationery.jpg',
          imgWidth: 400, imgHeight: 300,
        },
      ],
    },
    {
      id: 3,
      name: 'Bespoke Packaging Design',
      slug: 'packaging',
      icon: 'inventory_2',
      description: 'Luxury rigid boxes, sustainable mailers, and custom inserts that protect your product while amplifying your brand story.',
      accentFrom: '#059669',
      accentTo:   '#0d9488',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      badge: 'Premium',
      items: [
        {
          title: 'Eco-Friendly Mailer Boxes',
          description: 'Sustainable, custom-sized corrugated boxes for safe and environmentally responsible shipping.',
          imageUrl: 'assets/service/Eco-Friendly_Mailer_Boxes.jpg',
          imgWidth: 400, imgHeight: 300,
        },
        {
          title: 'Retail Product Packaging',
          description: 'Unique structural and graphic design that maximises shelf appeal and provides superior product protection.',
          imageUrl: 'assets/service/Retail_Product_Packaging.jpg',
          imgWidth: 400, imgHeight: 300,
        },
        {
          title: 'Premium Rigid Boxes',
          description: 'High-end, durable boxes with magnetic closures or foam inserts — perfect for luxury items and gifting.',
          imageUrl: 'assets/service/Premium_Rigid_Boxes.jpg',
          imgWidth: 400, imgHeight: 300,
        },
        {
          title: 'Custom Branded Tapes & Labels',
          description: 'The finishing touch: personalised tapes and labels for sealing and security with distinctive visual flair.',
          imageUrl: 'assets/service/Custom_Branded.jpg',
          imgWidth: 400, imgHeight: 300,
        },
      ],
    },
  ]);

  // ── FAQs (your exact data) ───────────────────────────────────
  faqs = signal([
    {
      question: 'Do you offer bulk volume discounts?',
      answer: 'Yes! We offer tiered pricing structures for bulk orders. The more you order, the more you save. Contact our sales team for a custom quote tailored to your volume.',
      isOpen: false,
    },
    {
      question: 'Can I get a physical sample before placing a large order?',
      answer: 'Absolutely. We believe in quality assurance. You can request a sample kit or a prototype of your custom packaging before committing to a full production run.',
      isOpen: false,
    },
    {
      question: 'What is your typical turnaround time?',
      answer: 'Standard printing orders take 3–5 business days. Custom packaging and gifting kits typically take 10–14 days depending on complexity and quantity. Rush options are available.',
      isOpen: false,
    },
    {
      question: 'Do you handle logistics and individual shipping?',
      answer: 'Yes, we provide end-to-end fulfillment. We can ship bulk to one location or individually to your employees\' doorsteps across India.',
      isOpen: false,
    },
    {
      question: 'What is the minimum order quantity?',
      answer: 'Minimum order quantities vary by product. Most gifting kits start at 50 units, printing from 100 pieces, and packaging from 200 units. We also accommodate smaller orders for samples.',
      isOpen: false,
    },
    {
      question: 'Can you match our exact brand colours and guidelines?',
      answer: 'Yes. We support Pantone matching, CMYK, and RGB profiles. Provide us your brand guidelines and we ensure pixel-perfect colour accuracy across all materials.',
      isOpen: false,
    },
  ]);

  // ── Image load state (your existing pattern) ─────────────────
  imageLoadedState: { [key: string]: boolean } = {};

  onImageLoad(itemTitle: string): void {
    this.imageLoadedState[itemTitle] = true;
  }

  // ── Lifecycle ────────────────────────────────────────────────
  ngOnInit(): void {
    this.title.setTitle('Our Services — Corporate Gifting, Printing & Packaging | BeanArts');
    this.meta.updateTag({ name: 'description', content: 'Explore BeanArts\' comprehensive corporate solutions: Premium Employee Welcome Kits, High-Quality Business Printing, and Eco-Friendly Custom Packaging Design.' });
    this.meta.updateTag({ name: 'keywords', content: 'Corporate Gifting Services, Bulk Printing Bangalore, Custom Packaging Design, Employee Swag Kits, Business Cards Printing, Eco-friendly Boxes' });
    this.meta.updateTag({ property: 'og:title', content: 'Our Services — Corporate Gifting, Printing & Packaging | BeanArts' });
    this.meta.updateTag({ property: 'og:description', content: 'Premium corporate gifting, custom printing, and bespoke packaging solutions for India\'s leading brands. Get a free quote.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://beanarts.in/services' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollReveal();
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  // ── Methods ──────────────────────────────────────────────────
  private setupScrollReveal(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => this.observer.observe(el));
  }

  toggleFaq(index: number): void {
    this.faqs.update((items) => {
      const updated = [...items];
      updated[index] = { ...updated[index], isOpen: !updated[index].isOpen };
      return updated;
    });
  }

  scrollToService(index: number): void {
    this.activeService.set(index);
    const el = document.getElementById('service-' + index);
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}