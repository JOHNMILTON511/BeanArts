import { Component, OnInit } from '@angular/core';

import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './careers.html',
  styles: []
})
export class Careers implements OnInit {

  positions = [
    { title: 'B2B Sales Manager', type: 'Full-time', location: 'Bengaluru', dept: 'Sales' },
    { title: 'Graphic Designer', type: 'Full-time', location: 'Bengaluru', dept: 'Creative' },
    { title: 'Operations Executive', type: 'Full-time', location: 'Bengaluru', dept: 'Logistics' }
  ];

  constructor(private meta: Meta, private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Careers at BeanArts | Join Our Team in Bengaluru');
    this.meta.updateTag({ name: 'description', content: 'Explore career opportunities at BeanArts. We are looking for passionate individuals to join India\'s fastest growing corporate gifting company in Bengaluru.' });
    this.meta.updateTag({ property: 'og:title', content: 'Careers at BeanArts | Join Our Team' });
    this.meta.updateTag({ property: 'og:description', content: 'Work with India\'s leading corporate gifting company. Open roles in Sales, Design, and Operations in Bengaluru.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://beanarts.in/careers' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
  }
}