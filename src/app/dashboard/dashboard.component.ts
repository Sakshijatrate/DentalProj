import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
// import { PatientReportComponent } from '../patient-report/patient-report.component';
import { AddPatientComponent } from '../add-patient/add-patient.component';
import { getPatients, savePatients } from '../utils/local-storage.util'; // adjust path
import { PatientData, PATIENT_DATA } from '../models/patient.model';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'date', 'age', 'type', 'status', 'actions'];
  dataSource = new MatTableDataSource<PatientData>();

  constructor(private dialog: MatDialog) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    const storedPatients = getPatients();

    if (storedPatients.length === 0) {
      savePatients(PATIENT_DATA); // Save initial data to localStorage
    }

    this.dataSource.data = getPatients();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.dataSource.filterPredicate = (data: PatientData, filter: string) => {
      const searchString = filter.trim().toLowerCase();

      return Object.values(data)
        .map(value => String(value).trim().toLowerCase())
        .some(value => value.includes(searchString));
    };
  }

  getStatusClass(status: string): string {
    return `status ${status.replace(' ', '-').toUpperCase()}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openAddPatientDialog(): void {
    const dialogRef = this.dialog.open(AddPatientComponent, {
      width: '500px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // 1. आधीचे डेटा मिळवा
        const existingPatients = getPatients();
  
        // 2. नवीन पेशंट अ‍ॅड करा
        existingPatients.push(result);
  
        // 3. अपडेट करून localStorage मध्ये सेव्ह करा
        savePatients(existingPatients);
  
        // 4. नवीन डेटा DataSource ला द्या
        this.dataSource.data = existingPatients;
      }
    });
  }
  
  
//pdf generator
openReportDialog(patient: any, implants: any[]): void {
  const doc = new jsPDF();
  const marginLeft = 15;
  let yPosition = 20;

  // Title
  doc.setFontSize(18);
  doc.text('Dental Implant Report', marginLeft, yPosition);
  yPosition += 10;

  // Patient Information
  doc.setFontSize(12);
  doc.text(`Patient ID: ${patient.id}`, marginLeft, yPosition);
  yPosition += 8;
  doc.text(`Name: ${patient.name}`, marginLeft, yPosition);
  yPosition += 8;
  doc.text(`Age: ${patient.age}`, marginLeft, yPosition);
  yPosition += 8;
  doc.text(`Date: ${patient.date}`, marginLeft, yPosition);
  yPosition += 10;

  // Implant Details Table
  if (implants && implants.length > 0) {
    autoTable(doc, {
      startY: yPosition,
      head: [['Tooth No', 'Diameter (mm)', 'Length (mm)', 'Notes']],
      body: implants.map(implant => [
        implant.tooth || '',
        implant.diameter || '',
        implant.length || '',
        implant.notes || ''
      ]),
      styles: {
        fontSize: 11,
        cellPadding: 4,
        valign: 'middle',
      },
      headStyles: {
        fillColor: [240, 240, 240],
        textColor: 0,
        fontStyle: 'bold',
      },
      theme: 'grid',
    });

    const finalY = (doc as any).lastAutoTable.finalY || yPosition + 10;
    doc.rect(marginLeft, finalY + 10, 180, 30); // x, y, w, h

  } else {
    doc.text('No implants added.', marginLeft, yPosition);
  }

  // Save PDF
  doc.save(`${patient.name}_Report.pdf`);
}

  
}
