import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-patient-information',
  templateUrl: './patient-information.component.html',
  styleUrls: ['./patient-information.component.css']
})
export class PatientInformationComponent {
  patient = { id: 'P1011', name: '', age: null, gender: '' };
  uploadedImage: string | ArrayBuffer | null = null;
  isFormComplete: boolean = false;

  constructor(private router: Router, private imageService: ImageService) {}
  // constructor(private imageService: ImageService) {}

  // onFileSelected(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.imageService.setImage(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageService.setImage(reader.result as string);
        this.router.navigate(['/implant-variant']);
      };
      reader.readAsDataURL(file);
    }
  }
  
  

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.uploadedImage = e.target?.result || null;
        this.checkFormCompletion();
      };
      reader.readAsDataURL(file);
    }
  }
  // patient-information.component.ts

  selectedImageSrc: string = '';

  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.selectedImageSrc = reader.result as string;

  //     // Save image in localStorage
  //     localStorage.setItem('selectedImage', this.selectedImageSrc);
  //   };
  //   reader.readAsDataURL(file);
  // }



  checkFormCompletion() {
    this.isFormComplete = !!(this.patient.name && this.patient.age && this.patient.gender && this.uploadedImage);
    console.log('Form Complete:', this.isFormComplete); 
  }

  continue() {
    const patientData = {
      id: this.patient.id,
      name: this.patient.name,
      age: this.patient.age,
      gender: this.patient.gender,
      image: this.uploadedImage // Use the uploaded image, not selectedImageSrc
    };

    localStorage.setItem('currentPatient', JSON.stringify(patientData));

    // Redirect to Implant Variant page
    this.router.navigate(['/implant-variant']);
}

}
