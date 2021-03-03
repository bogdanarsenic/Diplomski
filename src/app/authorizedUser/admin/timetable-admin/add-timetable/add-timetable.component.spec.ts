import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TimetableModule } from '../timetable.module';
import { AddTimetableComponent } from './add-timetable.component';
import { Component } from '@angular/core';
import { TimeTable } from 'src/app/shared/classes/TimeTable';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as TimetableActions from 'src/app/authorizedUser/admin/timetable-admin/store/actionsTmt';

@Component({
    template: `
    <app-add-timetable 
    [timetable]="timetable"> 
     </app-add-timetable>`
})

class TestHostComponent {

    timetable: TimeTable = {Id:"",Type:"",Day:"",Times:"",LineId:""};

    onSubmit()
    {
      this.store.dispatch(new TimetableActions.AddTimetable(this.timetable));
    }
    constructor(private store: Store<fromApp.AppState>) 
    {}
}

describe('AddTimetableComponent', () => {

  let component: TestHostComponent;
  let storeMock = {
    dispatch: jasmine.createSpy('dispatch')
  };

  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[TimetableModule],
      declarations: [ AddTimetableComponent,TestHostComponent ],
      providers: [{ provide: Store, useValue: storeMock}],
    })

    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dispatch action ', () => {

    component.onSubmit();
    fixture.detectChanges();

    expect(storeMock.dispatch).toHaveBeenCalledWith(
        new TimetableActions.AddTimetable(component.timetable)
    );

    expect(storeMock.dispatch).toHaveBeenCalledTimes(1);

  });
});
