import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent {
  patient = {
    id: '',
    name: '',
    date: '',
    age: null,
    type: '',
    status: '',
    implants: [] as any[] // ✅ implants will be added here
  };

  implant = {
    tooth: null,
    diameter: '',
    length: ''
  };
  implantDetails: { tooth: string | null, diameter: string, length: string }[] = [];


  constructor(public dialogRef: MatDialogRef<AddPatientComponent>) {}

  addImplantDetail() {
    // this.implantDetails.push({ tooth: '', diameter: '', length: '' });

    if (this.implant.tooth && this.implant.diameter && this.implant.length) {
      this.patient.implants.push({
        tooth: this.implant.tooth,
        diameter: this.implant.diameter,
        length: this.implant.length
      });
      this.implant = { tooth: null, diameter: '', length: '' }; // reset
    }
  }


  removeImplantDetail(index: number) {
    this.patient.implants.splice(index, 1);
  }

  save() {
    this.dialogRef.close(this.patient); // ✅ implants now part of patient object
  }

  cancel() {
    this.dialogRef.close();
  }
}
