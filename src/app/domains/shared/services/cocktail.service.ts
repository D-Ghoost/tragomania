import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Cocktail } from '../models/cocktail.model';
import { CocktailDetails } from '../models/cocktailDetails.model';

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

  getCocktailsForQuery(query : string | null = null){
    if( !query ){
      return of({ drinks : [] });
    }
    return this.http.get<{ drinks : Cocktail[] }>(`${this.API_URL}/filter.php?${query}`);
  }

  getCocktailsForInput( text : string = '' ){
    if( !text ){
      return of({ drinks : [] });
    }
    return this.http.get<{ drinks : Cocktail[] }>(`${this.API_URL}/search.php?s=${text}`);
  }

  getCocktailById( id : number | null = null ) : Observable<CocktailDetails> {
    if( !id ){
      return of({} as CocktailDetails);
    }
    return this.http.get<{ drinks : CocktailDetails[] }>(`${this.API_URL}/lookup.php?i=${id}`)
      .pipe(
        map(responde => {
          if( !responde.drinks || responde.drinks.length === 0 ){
            return {} as CocktailDetails;
          }
          const data = responde.drinks[0];
          const details : CocktailDetails = {
            idDrink: data.idDrink,
            strDrink: data.strDrink,
            strCategory: data.strCategory,
            strAlcoholic: data.strAlcoholic,
            strGlass: data.strGlass,
            strInstructions: data.strInstructions,
            strDrinkThumb: data.strDrinkThumb,
            strIngredient : this.getListIngredients( data as any, 'strIngredient' ),
            strMeasure : this.getListIngredients( data as any, 'strMeasure' )
          };
          return details;
        })
      );
  }

  getListIngredients( data : { [key : string] : string }, property : string){
    const elements = [];
    for( let i = 1; i <= 15; i++ ){
      const element = data[ property + i ];
      if( element ){
        elements.push(element);
      }else{
        break;
      }
    }
    return elements;
  }

}
