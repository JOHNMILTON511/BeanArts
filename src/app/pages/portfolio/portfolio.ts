import { Component, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

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
  imports: [CommonModule, RouterModule],
  templateUrl: './portfolio.html',
  styles: [`
    .portfolio-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }
    .active-filter {
      background-color: #4f46e5; /* Indigo-600 */
      color: white;
      border-color: #4f46e5;
    }
  `]
})
export class Portfolio implements OnInit {

  // Filter State
  currentFilter = signal<string>('All');

  // Projects Data (You can add real images here later)
  projects = signal<Project[]>([
    { id: 1, title: 'Tech Onboarding Kit', category: 'Gifting', client: 'TechCorp India', image: 'assets/portfolio/kit1.jpg' },
    { id: 2, title: 'Eco-Friendly Mailer Box', category: 'Packaging', client: 'GreenEarth', image: 'assets/portfolio/box1.jpg' },
    { id: 3, title: 'Gold Foil Business Cards', category: 'Printing', client: 'Luxe Estate', image: 'assets/portfolio/print1.jpg' },
    { id: 4, title: 'Diwali Dry Fruit Hamper', category: 'Gifting', client: 'FinServe', image: 'assets/portfolio/hamper1.jpg' },
    { id: 5, title: 'Employee Swag Hoodie', category: 'Gifting', client: 'StartUp Inc', image: 'assets/portfolio/swag1.jpg' },
    { id: 6, title: 'Rigid Perfume Box', category: 'Packaging', client: 'Aroma Co', image: 'assets/portfolio/box2.jpg' },
    { id: 7, title: 'Annual Report Brochure', category: 'Printing', client: 'NGO Trust', image: 'assets/portfolio/print2.jpg' },
    { id: 8, title: 'New Year Desk Calendar', category: 'Gifting', client: 'AutoMotive', image: 'assets/portfolio/cal1.jpg' },
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
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Browse our portfolio of corporate gifts, custom packaging, and printing projects delivered to top companies in India.' 
    });
  }

  setFilter(category: string) {
    this.currentFilter.set(category);
  }
}