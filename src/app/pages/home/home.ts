import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  private platformId      = inject(PLATFORM_ID);
  private meta            = inject(Meta);
  private title           = inject(Title);
  private observer!: IntersectionObserver;
  private counterObserver!: IntersectionObserver;
  private testimonialInterval: any;
  private counterAnimated = false;

  activeTestimonial = signal(0);

  // ── Counter animation state ───────────────────────────────────────
  private animatedNums = signal([0, 0, 0, 0]);

  readonly statCfg = [
    { target: 10,   format: (n: number) => n + '+',                                        label: 'Brands Served',       icon: 'groups' },
    { target: 50, format: (n: number) => n >= 1000 ? Math.round(n / 1000) + 'K+' : n + '', label: 'Gifts Delivered',  icon: 'card_giftcard' },
    { target: 100,  format: (n: number) => n + '%',                                         label: 'Quality Assured',    icon: 'verified' },
    { target: 2,    format: (n: number) => n + '+',                                         label: 'Years of Excellence', icon: 'workspace_premium' },
  ];

  animatedStats = computed(() =>
    this.animatedNums().map((n, i) => this.statCfg[i].format(n))
  );

  // ── Hero Slider ──────────────────────────────────────────────────
  heroCarouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    dots: true,
    nav: false,
    navSpeed: 800,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    responsive: { 0: { items: 1 }, 600: { items: 1 }, 900: { items: 1 } },
  };

  slides = [
    {
      id: 1,
      imgSrc: 'assets/New/5.jpg',
      eyebrow: 'Premium Corporate Gifting',
      title: 'Gifting That Speaks Gratitude',
      subtitle: 'Celebrate people. Strengthen relationships. Leave a lasting impression.',
      cta: { label: 'Explore Gifting', link: '/services' },
    },
    {
      id: 2,
      imgSrc: 'assets/New/2.jpg',
      eyebrow: 'Employee Onboarding Kits',
      title: 'Elevate Every Occasion',
      subtitle: 'From onboarding kits to festive hampers — we make every moment unforgettable.',
      cta: { label: 'View Catalog', link: '/services' },
    },
    {
      id: 3,
      imgSrc: 'assets/Slider/3.jpg',
      eyebrow: 'Custom Printing & Packaging',
      title: 'Smart. Stylish. Memorable.',
      subtitle: 'Corporate gifts and packaging crafted to impress, inspire, and convert.',
      cta: { label: 'Start a Project', link: '/contact' },
    },
  ];

  // ── Stats ────────────────────────────────────────────────────────
  stats = [
    { value: '10+', label: 'Brands Served',    icon: 'groups' },
    { value: '200+', label: 'Gifts Delivered',  icon: 'card_giftcard' },
    { value: '100%', label: 'Quality Assured',  icon: 'verified' },
    { value: '2+',   label: 'Years of Excellence', icon: 'workspace_premium' },
  ];

  // ── Services ─────────────────────────────────────────────────────
  services = [
    {
      img: 'assets/services/2.jpg',
      imgWidth: 600, imgHeight: 400,
      icon: 'card_giftcard',
      gradFrom: '#7c3aed', gradTo: '#4f46e5',
      badge: 'Most Popular',
      badgeClass: 'bg-violet-50 text-violet-700 border-violet-100',
      title: 'Corporate Gifting',
      description:
        'Premium curated gift collections that celebrate milestones, reward excellence, and build lasting client and employee loyalty.',
      features: ['Custom branding', 'Bulk pricing', 'Pan-India delivery', 'Eco-friendly options'],
      link: '/services',
    },
    {
      img: 'assets/services/5.jpg',
      imgWidth: 600, imgHeight: 400,
      icon: 'print',
      gradFrom: '#2563eb', gradTo: '#4f46e5',
      badge: 'High Demand',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-100',
      title: 'Custom Printing',
      description:
        'From business cards to grand-format banners — every print handled with precision, vibrant colour accuracy, and premium finishing.',
      features: ['Offset & digital print', 'Embossing & foiling', 'Fast turnaround', 'Pantone matching'],
      link: '/services',
    },
    {
      img: 'assets/services/3.jpg',
      imgWidth: 600, imgHeight: 400,
      icon: 'inventory_2',
      gradFrom: '#059669', gradTo: '#0d9488',
      badge: 'Premium',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      title: 'Bespoke Packaging',
      description:
        'Luxury rigid boxes, sustainable mailers, and custom inserts that protect your product and amplify your brand story.',
      features: ['Rigid & folding boxes', 'Sustainable materials', 'Custom inserts', 'Unboxing experiences'],
      link: '/services',
    },
  ];

  // ── Process ──────────────────────────────────────────────────────
  process = [
    {
      step: '01', icon: 'chat_bubble_outline',
      title: 'Consultation',
      desc: 'Share your vision, budget, and timeline. Our experts craft the perfect strategy for your brand goals.',
    },
    {
      step: '02', icon: 'design_services',
      title: 'Design & Sample',
      desc: 'We create custom designs and deliver physical samples for your approval before bulk production begins.',
    },
    {
      step: '03', icon: 'precision_manufacturing',
      title: 'Production',
      desc: 'Strict quality control at every stage ensures every item meets our uncompromising premium standards.',
    },
    {
      step: '04', icon: 'local_shipping',
      title: 'Delivery',
      desc: 'Pan-India delivery with real-time tracking. On time, every time — from 50 to 50,000 units.',
    },
  ];

  // ── Why Choose Us ────────────────────────────────────────────────
  whyUs = [
    { icon: 'workspace_premium', title: 'Premium Quality Guaranteed',  desc: 'Every product passes rigorous QC checks before it reaches your hands. We never compromise.' },
    { icon: 'speed',             title: 'Fast Turnaround',             desc: 'Express production options with committed timelines. Urgent order? We\'ve got you covered.' },
    { icon: 'palette',           title: 'Full Custom Branding',        desc: 'Your logo, colours, message — on every item, printed or packaged to absolute perfection.' },
    { icon: 'verified_user',     title: 'Trusted by 500+ Brands',     desc: 'From agile startups to Fortune 500 enterprises, leading brands trust us to deliver excellence.' },
    { icon: 'eco',               title: 'Sustainable Options',         desc: 'Eco-friendly materials and responsible sourcing. Premium and planet-conscious, together.' },
    { icon: 'support_agent',     title: 'Dedicated Account Manager',   desc: 'One point of contact for your entire project. No confusion. No delays. Just results.' },
  ];

  // ── Testimonials ─────────────────────────────────────────────────
  testimonials = [
    {
      text: 'BeanArts transformed our employee onboarding experience. The welcome kits were stunning — every new hire was genuinely impressed. The attention to detail and lightning-fast delivery made us look amazing as an employer.',
      author: 'Sarah J.',
      role: 'HR Director',
      company: 'TechCorp India',
      initial: 'SJ',
      gradFrom: '#7c3aed', gradTo: '#4f46e5',
      rating: 5,
    },
    {
      text: 'BeanArts handled our Diwali gifting for 2,000+ employees seamlessly. The logistics were flawless, the packaging premium, and our teams across India received their gifts on the exact promised date.',
      author: 'Rahul M.',
      role: 'Operations Head',
      company: 'FinServe Solutions',
      initial: 'RM',
      gradFrom: '#2563eb', gradTo: '#4f46e5',
      rating: 5,
    },
    {
      text: 'Their design team really understood our brand language. The custom rigid boxes came out looking exactly like the mockups — impeccable finish. Our clients were thoroughly impressed.',
      author: 'Anita D.',
      role: 'Marketing Lead',
      company: 'LuxeCo',
      initial: 'AD',
      gradFrom: '#059669', gradTo: '#0d9488',
      rating: 5,
    },
  ];

  // ── Gallery Carousel ─────────────────────────────────────────────
  galleryCarouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    nav: true,
    navText: ['', ''],
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 3500,
    autoplayHoverPause: true,
    responsive: { 0: { items: 1 }, 600: { items: 2 }, 960: { items: 3 } },
  };

  galleryImages = [
    { src: 'assets/services/5.jpg',  alt: 'Crafting Every Detail',    title: 'Crafting Every Detail',    caption: 'Where premium gifts take shape with precision and care.' },
    { src: 'assets/gallery/2.jpg',   alt: 'Thoughtful Packaging',     title: 'Thoughtful Packaging',     caption: 'Curated unboxing experiences that leave a lasting impression.' },
    { src: 'assets/gallery/3.jpg',   alt: 'Celebrating Every Moment', title: 'Celebrating Every Moment', caption: 'Making corporate milestones meaningful and memorable.' },
    { src: 'assets/gallery/4.jpg',   alt: 'Gifting That Inspires',    title: 'Gifting That Inspires',    caption: 'Unique collections curated to elevate appreciation.' },
    { src: 'assets/gallery/5.jpg',   alt: 'Premium Hamper Setups',    title: 'Premium Hamper Setups',    caption: 'Elegant arrangements crafted for festive gifting.' },
    { src: 'assets/gallery/6.jpg',   alt: 'Behind the Scenes',        title: 'Behind the Scenes',        caption: 'Creativity and craftsmanship brought to life every day.' },
  ];

  // ── Client logos (text fallback) ────────────────────────────────
  clients = [
    'Infosys', 'Wipro', 'Accenture', 'Deloitte', 'KPMG', 'Swiggy',
    'Meesho', 'Razorpay', 'Cred', 'PhonePe', 'Urban Company', 'Nykaa',
  ];

  // ── Industries We Serve ───────────────────────────────────────────
  industries = [
    { icon: 'computer',        label: 'Technology & IT',      desc: 'Welcome kits, offsite merchandise, dev-team swag & branded merch.', color: '#4f46e5', bg: 'rgba(79,70,229,0.08)' },
    { icon: 'account_balance', label: 'Banking & Finance',    desc: 'Client appreciation boxes, milestone hampers & festive gifting.', color: '#0ea5e9', bg: 'rgba(14,165,233,0.08)' },
    { icon: 'shopping_bag',    label: 'FMCG & Retail',        desc: 'Branded packaging, seasonal hampers & retail bags at scale.', color: '#d97706', bg: 'rgba(217,119,6,0.08)' },
    { icon: 'rocket_launch',   label: 'Startups & SMEs',      desc: 'Founder kits, investor decks, first-hire welcome packs & swag.', color: '#7c3aed', bg: 'rgba(124,58,237,0.08)' },
    { icon: 'local_hospital',  label: 'Healthcare & Pharma',  desc: 'Doctor appreciation gifts, conference kits & wellness hampers.', color: '#059669', bg: 'rgba(5,150,105,0.08)' },
    { icon: 'celebration',     label: 'Events & Conferences', desc: 'Speaker gifts, attendee kits & branded conference collateral.', color: '#db2777', bg: 'rgba(219,39,119,0.08)' },
  ];

  // ── Portfolio showcase (uses existing image assets) ───────────────
  portfolioShowcase = [
    { src: 'assets/gallery/1.jpg',  label: 'Employee Onboarding Kit',  category: 'Gifting',   color: '#7c3aed' },
    { src: 'assets/gallery/2.jpg',  label: 'Luxury Hamper Box',        category: 'Packaging', color: '#059669' },
    { src: 'assets/gallery/4.jpg',  label: 'Festive Gift Collection',  category: 'Gifting',   color: '#d97706' },
    { src: 'assets/services/3.jpg', label: 'Bespoke Rigid Packaging',  category: 'Packaging', color: '#059669' },
    { src: 'assets/services/5.jpg', label: 'Custom Print Collateral',  category: 'Printing',  color: '#2563eb' },
    { src: 'assets/gallery/6.jpg',  label: 'Branded Swag Collection',  category: 'Gifting',   color: '#7c3aed' },
  ];

  // ── Lifecycle ────────────────────────────────────────────────────
  ngOnInit(): void {
    this.title.setTitle('BeanArts | Premium Corporate Gifting & Custom Packaging Solutions');
    this.meta.updateTag({ name: 'description', content: 'BeanArts provides premium corporate gifting, employee onboarding kits, bespoke printing, and eco-friendly packaging solutions across India. Get a free quote today.' });
    this.meta.updateTag({ property: 'og:title', content: 'BeanArts — Premium Corporate Gifting & Packaging' });
    this.meta.updateTag({ property: 'og:description', content: 'Elevate your brand with custom corporate gifts, packaging, and printing solutions. 50+ brands served. Pan-India delivery.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://beanarts.in/' });
    this.meta.updateTag({ property: 'og:image', content: 'https://beanarts.in/assets/logo/beanarts-logo-512.png' });
    this.meta.updateTag({ name: 'twitter:title', content: 'BeanArts — Premium Corporate Gifting & Packaging' });
    this.meta.updateTag({ name: 'twitter:description', content: 'Custom corporate gifts, onboarding kits, eco-friendly packaging and printing. 50+ brands. Pan-India delivery.' });
    this.startTestimonialRotation();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollReveal();
      this.setupCounterAnimation();
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.counterObserver?.disconnect();
    clearInterval(this.testimonialInterval);
  }

  // ── Methods ──────────────────────────────────────────────────────
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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => this.observer.observe(el));
  }

  private setupCounterAnimation(): void {
    const statsEl = document.getElementById('home-stats');
    if (!statsEl) return;
    this.counterObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this.counterAnimated) {
          this.counterAnimated = true;
          this.counterObserver.disconnect();
          this.runCounters();
        }
      },
      { threshold: 0.4 }
    );
    this.counterObserver.observe(statsEl);
  }

  private runCounters(): void {
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      this.animatedNums.set(this.statCfg.map(s => Math.round(s.target * eased)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  private startTestimonialRotation(): void {
    this.testimonialInterval = setInterval(() => {
      this.activeTestimonial.update((i) => (i + 1) % this.testimonials.length);
    }, 5500);
  }

  setTestimonial(index: number): void {
    this.activeTestimonial.set(index);
    clearInterval(this.testimonialInterval);
    this.startTestimonialRotation();
  }

  get activeT() {
    return this.testimonials[this.activeTestimonial()];
  }
}