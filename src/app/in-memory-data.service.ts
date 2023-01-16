import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Keyboard } from './keyboard';
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    const keyboards = [
      { id: 12, name: 'NuPhy AIR75', image: 'https://i.rtings.com/assets/products/LrSS2kiX/nuphy-air75/design-small.jpg'},
      { id: 13, name: 'Keychron V Series', image: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1629995644-frame-4-1629995636.jpg'},
      { id: 14, name: 'Royal Kludge RK61', image: 'https://i.rtings.com/assets/products/LrSS2kiX/nuphy-air75/design-small.jpg'},
      { id: 15, name: 'Magneta', image:'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1629995644-frame-4-1629995636.jpg' },
      { id: 16, name: 'Razer Pro Type Ultra', image: 'https://i.rtings.com/assets/products/LrSS2kiX/nuphy-air75/design-small.jpg'},
      { id: 17, name: 'Dynama', image: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1629995644-frame-4-1629995636.jpg'},
      { id: 18, name: 'Mountain Everest Max', image: 'https://i.rtings.com/assets/products/LrSS2kiX/nuphy-air75/design-small.jpg'},
      { id: 19, name: 'Magma', image: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1629995644-frame-4-1629995636.jpg'},
      { id: 20, name: 'Tornado', image: 'https://i.rtings.com/assets/products/LrSS2kiX/nuphy-air75/design-small.jpg' }
    ];
    return {keyboards};
  }
  genId(keyboards: Keyboard[]): number {
    return keyboards.length > 0 ? Math.max(...keyboards.map(keyboard => keyboard.id)) + 1 : 11;
  }
}
