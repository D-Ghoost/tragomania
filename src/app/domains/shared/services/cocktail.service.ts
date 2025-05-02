import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  private http = inject(HttpClient);
  private readonly API_URL = "https://www.thecocktaildb.com/api/json/v1/1";
  constructor() { }

  getCocktailsForLetter(){
    const letters : string[] = "abcdefghijklmnopqrstwyz".split('');
    const index = Math.floor(Math.random() * letters.length);
    const letter = letters[index];
    return this.http.get<{ drinks : Cocktail[] }>(`${this.API_URL}/search.php?f=${letter}`);
  }

}
