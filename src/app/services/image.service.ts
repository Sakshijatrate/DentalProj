import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private selectedImage = new BehaviorSubject<string>('');  // ✅ Correct type

  setImage(image: string): void {
    this.selectedImage.next(image);  // ✅ Use `.next()` for BehaviorSubject
  }

  getImage(): BehaviorSubject<string> {
    return this.selectedImage;       // ✅ Return the BehaviorSubject
  }
}
