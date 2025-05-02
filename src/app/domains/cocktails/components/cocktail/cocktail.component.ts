import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cocktail',
  imports: [CommonModule],
  templateUrl: './cocktail.component.html',
  styleUrl: './cocktail.component.css'
})
export class CocktailComponent {
  @Input() name : string = '';
  @Input() imgUrl : string = '';
  @Input() alt : string = `Image to ${this.name}`;
  @Input() additionalClass : string  = '';
}
