import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  imports: [],
  templateUrl: './svg-icon.html',
  styleUrl: './svg-icon.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgIcon {
name = input.required<string>();
}
