import { Component, computed, signal, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

interface Project {
  id: number;
  title: string;
  category: 'Gifting' | 'Printing' | 'Packaging';
  client: string;
  image: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [RouterModule,MatButtonModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio implements OnInit {

  // Filter State
  currentFilter = signal<string>('All');

  // Projects Data (You can add real images here later)
  projects = signal<Project[]>([
    { id: 1, title: 'Tech Onboarding Kit', category: 'Gifting', client: 'TechCorp India', image: 'assets/portfolio/kit1.png' },
    { id: 2, title: 'Eco-Friendly Mailer Box', category: 'Packaging', client: 'GreenEarth', image: 'assets/portfolio/box1.png' },
    { id: 3, title: 'Gold Foil Business Cards', category: 'Printing', client: 'Luxe Estate', image: 'assets/portfolio/print1.png' },
    { id: 4, title: 'Diwali Dry Fruit Hamper', category: 'Gifting', client: 'FinServe', image: 'assets/portfolio/hamper1.png' },
    { id: 5, title: 'Employee Swag Hoodie', category: 'Gifting', client: 'StartUp Inc', image: 'assets/portfolio/swag1.png' },
    { id: 6, title: 'Rigid Perfume Box', category: 'Packaging', client: 'Aroma Co', image: 'assets/portfolio/box2.png' },
    { id: 7, title: 'Annual Report Brochure', category: 'Printing', client: 'NGO Trust', image: 'assets/portfolio/print2.png' },
    { id: 8, title: 'New Year Desk Calendar', category: 'Gifting', client: 'AutoMotive', image: 'assets/portfolio/cal1.png' },
  ]);

  // Computed Signal for Filtering
  filteredProjects = computed(() => {
    const filter = this.currentFilter();
    if (filter === 'All') return this.projects();
    return this.projects().filter(p => p.category === filter);
  });

  constructor(private meta: Meta, private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Our Work & Portfolio | BeanArts Corporate Gifting');
    this.meta.updateTag({ name: 'description', content: 'Browse our portfolio of corporate gifts, custom packaging, and printing projects delivered to top companies in India.' });
    this.meta.updateTag({ property: 'og:title', content: 'Portfolio — Our Work | BeanArts Corporate Gifting' });
    this.meta.updateTag({ property: 'og:description', content: 'Explore premium gifting, custom packaging, and printing projects we\'ve delivered for leading Indian brands.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://beanarts.in/portfolio' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
  }

  setFilter(category: string) {
    this.currentFilter.set(category);
  }
}