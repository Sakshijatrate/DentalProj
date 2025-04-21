export interface PatientData {
    id: string;
    name: string;
    date: string;
    age: number;
    type: string;
    status: string;
  }
  
  export const PATIENT_DATA: PatientData[] = [
    { id: 'P1001', name: 'Alice Smith', date: '2025-02-10', age: 38, type: 'Implant', status: 'COMPLETED' },
    { id: 'P1002', name: 'Michael Johnson', date: '2025-03-10', age: 52, type: 'Implant', status: 'COMPLETED' },
    { id: 'P1003', name: 'Emily Brown', date: '2025-01-10', age: 29, type: 'Implant', status: 'PENDING' },
    { id: 'P1004', name: 'David Williams', date: '2025-01-10', age: 41, type: 'Crown', status: 'COMPLETED' },
    { id: 'P1005', name: 'Sophia Davis', date: '2025-04-10', age: 36, type: 'Implant', status: 'IN PROGRESS' },
  ];
  