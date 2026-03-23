import { Component, OnInit, signal } from '@angular/core';

import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './blog.html',
  styles: [`
    .blog-card-img {
      transition: transform 0.5s ease;
    }
    .blog-card:hover .blog-card-img {
      transform: scale(1.05);
    }
  `]
})
export class Blog implements OnInit {

  posts = signal([
    {
      id: 1,
      title: 'Top 10 Sustainable Corporate Gift Ideas for 2025',
      excerpt: 'Eco-friendly gifting is no longer a trend, it is a necessity. Discover our top picks for bamboo, cork, and recycled gifting options.',
      date: 'Oct 12, 2025',
      category: 'Trends',
      image: 'assets/gallery/3.jpg',
      slug: 'sustainable-gift-ideas-2025'
    },
    {
      id: 2,
      title: 'The Ultimate Guide to Employee Onboarding Kits',
      excerpt: 'First impressions matter. Learn what the top tech companies in Bangalore are including in their new joinee welcome kits.',
      date: 'Sep 28, 2025',
      category: 'Guides',
      image: 'assets/gallery/5.jpg',
      slug: 'employee-onboarding-guide'
    },
    {
      id: 3,
      title: 'Corporate Diwali Gifting: Planning Ahead',
      excerpt: 'Avoid the last-minute rush. Here is a timeline for ordering bulk festive hampers to ensure timely delivery across India.',
      date: 'Aug 15, 2025',
      category: 'Festive',
      image: 'assets/gallery/7.jpg',
      slug: 'diwali-gifting-timeline'
    }
  ]);

  constructor(private meta: Meta, private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Insights & Trends | BeanArts Corporate Gifting Blog');
    this.meta.updateTag({ name: 'description', content: 'Read the latest insights on corporate gifting trends, employee engagement strategies, and sustainable packaging ideas from BeanArts.' });
    this.meta.updateTag({ name: 'keywords', content: 'Corporate Gifting Blog, Gifting Trends 2025, Employee Engagement Ideas, Sustainable Gifting India' });
    this.meta.updateTag({ property: 'og:title', content: 'Insights & Trends | BeanArts Corporate Gifting Blog' });
    this.meta.updateTag({ property: 'og:description', content: 'Expert advice on corporate gifting, packaging trends, and employee engagement from BeanArts.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://beanarts.in/blog' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
  }
}