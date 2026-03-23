import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit, AfterViewInit, OnDestroy {
  private meta       = inject(Meta);
  private title      = inject(Title);
  private platformId = inject(PLATFORM_ID);
  private observer!: IntersectionObserver;

  // ── Advantages ───────────────────────────────────────────────
  advantages = [
    {
      icon: 'workspace_premium',
      color: '#4f46e5',
      colorBg: 'rgba(79,70,229,0.08)',
      borderColor: '#c7d2fe',
      title: 'Unrivaled Quality',
      desc: 'We commit to the highest standards, using only premium, sustainable materials for all printing, packaging, and custom merchandise. Zero compromise on finish.',
    },
    {
      icon: 'auto_awesome',
      color: '#d97706',
      colorBg: 'rgba(217,119,6,0.08)',
      borderColor: '#fde68a',
      title: 'Bespoke Customization',
      desc: 'Every element — from gift contents to print finishes — is uniquely tailored to perfectly reflect your brand\'s identity and narrative.',
    },
    {
      icon: 'local_shipping',
      color: '#0d9488',
      colorBg: 'rgba(13,148,136,0.08)',
      borderColor: '#99f6e4',
      title: 'Seamless Execution',
      desc: 'End-to-end service covering design consultation, production, logistics, and timely drop-shipping. Hassle-free gifting, guaranteed.',
    },
  ];

  // ── Mission & Vision ─────────────────────────────────────────
  mvv = [
    {
      emoji: '🎯',
      label: 'Our Mission',
      color: '#4f46e5',
      colorLight: '#eef2ff',
      text: 'To be the trusted partner for businesses seeking to elevate their corporate relationships through thoughtfully designed, high-impact gifting and branding solutions.',
    },
    {
      emoji: '🌟',
      label: 'Our Vision',
      color: '#d97706',
      colorLight: '#fffbeb',
      text: 'To set the global standard for custom corporate expressions, ensuring every BeanArts creation is a powerful catalyst for connection and appreciation.',
    },
  ];

  // ── Core Values ──────────────────────────────────────────────
  values = [
    {
      emoji: '💡',
      title: 'Innovation & Design',
      desc: 'We constantly seek new methods and materials to deliver fresh, cutting-edge designs that set your brand apart.',
    },
    {
      emoji: '🤝',
      title: 'Integrity',
      desc: 'Conducting business with transparency, honesty, and ethical responsibility at all times — no exceptions.',
    },
    {
      emoji: '🌎',
      title: 'Sustainability',
      desc: 'Prioritising eco-friendly production and responsible sourcing to reduce our environmental footprint.',
    },
  ];

  // ── Timeline ─────────────────────────────────────────────────
  timeline = [
    {
      year: '2018',
      label: 'The Seed is Planted',
      title: 'Inception: Redefining Corporate Gifting',
      desc: 'Founded with a vision to move past generic merchandise. Our focus was placed on high-quality, personalised gifts that truly reflect brand values.',
      color: '#4f46e5',
      colorLight: '#eef2ff',
    },
    {
      year: '2021',
      label: 'Integrated Expertise',
      title: 'Acquisition of Premium Print Services',
      desc: 'To ensure brand consistency, we integrated high-end digital and offset printing services, offering a unified solution for branded collateral and bespoke packaging.',
      color: '#d97706',
      colorLight: '#fffbeb',
    },
    {
      year: '2024',
      label: 'Pan-India Scale',
      title: '50+ Brands Served Nationwide',
      desc: 'Crossed 500 active brand partnerships, expanded our Bengaluru production facility, and launched same-week delivery for bulk orders across 50+ cities.',
      color: '#7c3aed',
      colorLight: '#f5f3ff',
    },
    {
      year: 'Now',
      label: 'Global & Sustainable',
      title: 'Robust Global Fulfillment Network',
      desc: 'We operate a secure, sustainable global fulfillment network, capable of deploying personalised gifts directly to recipients across India and 50+ countries.',
      color: '#0d9488',
      colorLight: '#f0fdfa',
    },
  ];

  // ── Team stats ───────────────────────────────────────────────
  teamStats = [
    { value: '50+', label: 'Brands Served' },
    { value: '2+',   label: 'Years Experience' },
    { value: '50+', label: 'Gifts Delivered' },
    { value: '5+',  label: 'Cities Covered' },
  ];

  // ── Lifecycle ────────────────────────────────────────────────
  ngOnInit(): void {
    this.title.setTitle('Our Story & Vision | BeanArts Corporate Gifting');
    this.meta.updateTag({ name: 'description', content: 'Learn about BeanArts, India\'s premier corporate gifting partner. Founded in 2018, we specialise in sustainable, high-quality custom branding and pan-India logistics.' });
    this.meta.updateTag({ name: 'keywords', content: 'BeanArts Story, Corporate Gifting Company Profile, Sustainable Gifting India, Custom Packaging Company' });
    this.meta.updateTag({ property: 'og:title', content: 'Our Story & Vision | BeanArts Corporate Gifting' });
    this.meta.updateTag({ property: 'og:description', content: 'Founded in 2018 in Bengaluru, BeanArts is India\'s trusted partner for premium corporate gifting, custom packaging, and printing.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://beanarts.in/about' });
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
}