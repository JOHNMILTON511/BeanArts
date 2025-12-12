import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule,NgOptimizedImage],
  templateUrl: './hero.html',
  styleUrls: ['./hero.css'],
})
export class Hero {}