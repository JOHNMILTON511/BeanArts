import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [
    MatButtonModule, RouterModule
  ],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {

}
