import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PatientDataService {
  private patientDataKey = 'patientData';  // Local Storage key

  constructor() {
    // Ensure there's no data left from previous sessions
    const storedData = localStorage.getItem(this.patientDataKey);
    if (storedData) {
      this.patientData = JSON.parse(storedData);
    }
  }

  private patientData: any = {};

  // Auto generate Patient ID
  generatePatientId(): string {
    const timestamp = new Date().getTime();
    return `P-${timestamp}`;
  }

  setPatientData(data: any) {
    // Auto generate ID if not provided
    if (!data.id) {
      data.id = this.generatePatientId();
    }
    
    // Save data to local storage
    this.patientData = data;
    localStorage.setItem(this.patientDataKey, JSON.stringify(this.patientData));
  }

  getPatientData() {
    return this.patientData;
  }

  clearPatientData() {
    this.patientData = {};
    localStorage.removeItem(this.patientDataKey);  // Clear localStorage
  }
}
