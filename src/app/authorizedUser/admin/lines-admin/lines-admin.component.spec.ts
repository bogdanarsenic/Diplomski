import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinesAdminComponent } from './lines-admin.component';

describe('LinesAdminComponent', () => {
  let component: LinesAdminComponent;
  let fixture: ComponentFixture<LinesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
