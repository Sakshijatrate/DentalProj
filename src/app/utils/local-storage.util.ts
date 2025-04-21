import { PatientData, PATIENT_DATA } from '../models/patient.model';


// const STORAGE_KEY = 'patients';

// export function getPatients(): PatientData[] {
//   const stored = localStorage.getItem(STORAGE_KEY);
//   return stored ? JSON.parse(stored) : [];
// }

// export function savePatients(patients: PatientData[]): void {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
// }

const PATIENT_KEY = 'patients';

export function getPatients(): any[] {
  return JSON.parse(localStorage.getItem(PATIENT_KEY) || '[]');
}

export function savePatients(patients: any[]): void {
  localStorage.setItem(PATIENT_KEY, JSON.stringify(patients));
}
