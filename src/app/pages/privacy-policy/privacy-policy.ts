import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  imports: [
    CommonModule
  ],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.css',
})
export class PrivacyPolicy {
    lastUpdatedDate: string = 'October 25, 2025';

  constructor() { }

  ngOnInit(): void {
  }
}
