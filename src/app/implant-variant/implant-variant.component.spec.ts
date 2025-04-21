import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplantVariantComponent } from './implant-variant.component';

describe('ImplantVariantComponent', () => {
  let component: ImplantVariantComponent;
  let fixture: ComponentFixture<ImplantVariantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImplantVariantComponent]
    });
    fixture = TestBed.createComponent(ImplantVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
