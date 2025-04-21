import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-implant-variant',
  templateUrl: './implant-variant.component.html',
  styleUrls: ['./implant-variant.component.css']
})
export class ImplantVariantComponent implements OnInit{

 
  @ViewChild('mainImageContainer', { static: true }) mainImageContainer!: ElementRef;

  uploadedImageSrc: string = '';
  addedImplants: any[] = [];

  selectedDiameter: string = '';
  selectedLength: string = '';
  selectedToothNumber: string = '';
  selectedImplantType: string = '';
  notes: string = '';
  constructor() {}
  addImplant(implantData: any) {
    this.addedImplants.push(implantData);
    localStorage.setItem('addedImplants', JSON.stringify(this.addedImplants));
  }
  

  patientName: string = '';
patientId: string = '';
patientAge: number = 0;
patientGender: string = '';
mainImageUrl: string = '';

ngOnInit() {
  const storedPatient = localStorage.getItem('currentPatient');
  if (storedPatient) {
    const patientData = JSON.parse(storedPatient);
    this.uploadedImageSrc = patientData.image;
  }
  const stored = localStorage.getItem('addedImplants');
  if (stored) {
    this.addedImplants = JSON.parse(stored);
  }
}
allToothNumbers: string[] = [
  '11', '12', '13', '14', '15', '16', '17',
  '21', '22', '23', '24', '25', '26', '27',
  '31', '32', '33', '34', '35', '36', '37',
  '41', '42', '43', '44', '45', '46', '47'
];

  
  diameters = [3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0];
  lengths = [6, 8, 10, 12, 14, 16, 17];
  selectedImplant: any = null;
  
 
  upperImplants = [
    ...[17, 16, 15, 14, 13, 12, 11].map(num => ({
      id: num.toString(),
      src: `assets/images/${num}.png`
    })),
    ...[21, 22, 23, 24, 25, 26, 27].map(num => ({
      id: num.toString(),
      src: `assets/images/${num}.png`
    }))
  ];
  
  
  lowerImplants = [
    ...[47, 46, 45, 44, 43, 42, 41].map(num => ({
      id: num.toString(),
      src: `assets/images/${num}.png`
    })),
    ...[31, 32, 33, 34, 35, 36, 37].map(num => ({
      id: num.toString(),
      src: `assets/images/${num}.png`
    }))
  ];
  
  
  droppedImplants: any[] = [];
  // selectedImplant: any = null;
  // diameters = [3.0, 3.5, 4.0, 4.5, 5.0];
  // lengths = [6, 8, 10, 12, 14, 17];

  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = e => this.mainImageSrc = reader.result as string;
  //   reader.readAsDataURL(file);
  // }

  onDragStart(event: DragEvent, img: any, type: 'upper' | 'lower') {
    event.dataTransfer?.setData('text/plain', JSON.stringify({ ...img, type }));
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer?.getData('text/plain') || '{}');
    const rect = this.mainImageContainer.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (!this.isValidQuadrant(data.id, x, y, rect.width, rect.height)) {
      alert('Invalid quadrant');
      return;
    }

    this.droppedImplants.push({
      ...data,
      x,
      y,
      diameter: 3,
      length: 6,
      rotation: data.type === 'upper' ? 180 : 0,
      isSelected: false,
      offsetX: 0,
      offsetY: 0,
      dragging: false
    });
  }

  isValidQuadrant(id: string, x: number, y: number, width: number, height: number): boolean {
    const toothNum = parseInt(id, 10);
  
    if (toothNum >= 11 && toothNum <= 17 && x < width / 2 && y < height / 2) return true; // Upper Left
    if (toothNum >= 21 && toothNum <= 27 && x >= width / 2 && y < height / 2) return true; // Upper Right
    if (toothNum >= 31 && toothNum <= 37 && x >= width / 2 && y >= height / 2) return true; // Lower Right
    if (toothNum >= 41 && toothNum <= 47 && x < width / 2 && y >= height / 2) return true; // Lower Left
  
    return false;
  }

  // isValidQuadrant(id: string, x: number, y: number, width: number, height: number): boolean {
  //   const quadrantWidth = width / 2;
  //   const quadrantHeight = height / 2;
  
  //   const firstQuadrant = x < quadrantWidth && y < quadrantHeight;
  //   const secondQuadrant = x >= quadrantWidth && y < quadrantHeight;
  //   const thirdQuadrant = x < quadrantWidth && y >= quadrantHeight;
  //   const fourthQuadrant = x >= quadrantWidth && y >= quadrantHeight;
  
  //   const numId = parseInt(id);
  
  //   if ([11, 12, 13, 14, 15, 16, 17].includes(numId) && firstQuadrant) return true;
  //   if ([21, 22, 23, 24, 25, 26, 27].includes(numId) && secondQuadrant) return true;
  //   if ([31, 32, 33, 34, 35, 36, 37].includes(numId) && thirdQuadrant) return true;
  //   if ([41, 42, 43, 44, 45, 46, 47].includes(numId) && fourthQuadrant) return true;
  
  //   return false;
  // }
  

  isUpperImplant(implant: any): boolean {
    return implant.name.startsWith('1.') || implant.name.startsWith('2.');
  }
  
  isLowerImplant(implant: any): boolean {
    return implant.name.startsWith('3.') || implant.name.startsWith('4.');
  }
  

  onImplantDropped(toothNumber: string, type: string) {
    const implantData = {
      toothNumber: toothNumber,
      diameter: this.selectedDiameter || '3.5mm',
      length: this.selectedLength || '10mm',
      type: type || 'Fixed Prosthesis',
      notes: this.notes || ''
    };

    this.addedImplants.push(implantData);
    localStorage.setItem('addedImplants', JSON.stringify(this.addedImplants));
  }

  getPixelSizeFromMm(mm: number): number {
    return mm * 3.78; // 1mm ≈ 3.78px
  }
  
  // selectImplant(implant: any) {
  //   this.droppedImplants.forEach(i => i.isSelected = false);
  //   implant.isSelected = true;
  //   this.selectedImplant = implant;

  //   if (!implant.toothNumber) {
  //     implant.toothNumber = implant.label; // उदा. "1.1", "2.3"
  //   }
  // }

  rotateSelectedImplant(angle: number, implant: any) {
    implant.rotation += angle;
    implant.rotation = implant.rotation % 360; // To ensure rotation stays between 0 - 360 degrees
  }
  

  startMove(event: MouseEvent, implant: any) {
    implant.dragging = true;
    implant.offsetX = event.offsetX;
    implant.offsetY = event.offsetY;
  }

  moveImplant(event: MouseEvent, implant: any) {
    if (implant.dragging) {
      const rect = this.mainImageContainer.nativeElement.getBoundingClientRect();
      const newX = event.clientX - rect.left - implant.offsetX;
      const newY = event.clientY - rect.top - implant.offsetY;
  
      const implantWidth = parseFloat(implant.diameter); // mm as px for simplicity
      const implantHeight = parseFloat(implant.length);
  
      if (newX >= 0 && newY >= 0 && newX + implantWidth <= rect.width && newY + implantHeight <= rect.height) {
        implant.x = newX;
        implant.y = newY;
      }
    }
  }
  
  endMove(implant: any) {
    implant.dragging = false;
  }

  changeDiameter(event: any) {
    const newDiameter = parseFloat(event.target.value);
    if (this.selectedImplant) {
      this.selectedImplant.diameter = newDiameter;
      // this.updateImplantOverlayText();
    }
  }
  
  changeLength(event: any) {
    const newLength = parseInt(event.target.value, 10);
    if (this.selectedImplant) {
      this.selectedImplant.length = newLength;
      // this.updateImplantOverlayText();
    }
  }

  
selectImplant(implant: any) {
  this.droppedImplants.forEach(i => i.isSelected = false);
  implant.isSelected = true;
  this.selectedImplant = implant;

  // Sync dropdowns with selected implant
  this.selectedDiameter = implant.diameter;
  this.selectedLength = implant.length;
}

deselectImplant(event: any) {
  if (event.target.classList.contains('main-image')) {
    this.droppedImplants.forEach(i => i.isSelected = false);
    this.selectedImplant = null;
  }
}

}