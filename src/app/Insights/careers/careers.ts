import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
    this.title.setTitle('Careers at BeanArts | Join Our Team');
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Explore career opportunities at BeanArts. We are looking for passionate individuals to join India\'s fastest growing corporate gifting company.' 
    });
  }
}