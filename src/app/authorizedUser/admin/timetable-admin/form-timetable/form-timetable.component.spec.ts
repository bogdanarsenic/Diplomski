import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTimetableComponent } from './form-timetable.component';

describe('FormTimetableComponent', () => {
  let component: FormTimetableComponent;
  let fixture: ComponentFixture<FormTimetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTimetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
