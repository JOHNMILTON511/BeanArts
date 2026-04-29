import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterModule, NgOptimizedImage],
  templateUrl: './hero.html',
  styleUrls: ['./hero.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {}