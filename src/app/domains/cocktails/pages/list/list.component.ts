import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CocktailComponent } from '../../components/cocktail/cocktail.component';


@Component({
  selector: 'app-list',
  imports: [CommonModule, CocktailComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

}
