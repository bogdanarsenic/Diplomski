import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TimetableModule } from '../timetable.module';
import { Component } from '@angular/core';
import { TimeTable } from 'src/app/shared/classes/TimeTable';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as TimetableActions from 'src/app/authorizedUser/admin/timetable-admin/store/actionsTmt';
import { EditTimetableComponent } from './edit-timetable.component';

@Component({
    template: `
    <app-edit-timetable 
    [timetable]="timetable" 
    [timetables]="timetables"> 
    </app-edit-timetable>`
})

class TestHostComponent {

    timetable: TimeTable = {Id:"",Type:"",Day:"",Times:"",LineId:""};
    timetables:TimeTable[]=[this.timetable];
    index:number

    ngOnChanges()
    {
      this.index=this.timetables.findIndex(x=>x.Id===this.timetable.Id);
    }
  
    onSubmit()
    {
      this.store.dispatch(new TimetableActions.EditTimetable({index:this.index,newTimetable:this.timetable}));
    }  
  
    Delete()
    {
      this.store.dispatch(new TimetableActions.DeleteTimetable({index:this.index,selectedTimetable:this.timetable}));
    }

    constructor(private store: Store<fromApp.AppState>) 
    { }
}

describe('EditTimetableComponent', () => {

  let component: TestHostComponent;
  let storeMock = {
    dispatch: jasmine.createSpy('dispatch')
  };

  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[TimetableModule],
      declarations: [ EditTimetableComponent,TestHostComponent ],
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

  it('should call dispatch action Edit', () => {

    component.ngOnChanges();
    component.onSubmit();
    

    fixture.detectChanges();

    expect(component.index).toBe(0);
    expect(storeMock.dispatch).toHaveBeenCalledWith(
        new TimetableActions.EditTimetable({index:component.index,newTimetable:component.timetable})
    );

  });

  it('should call dispatch action Delete', () => {

    component.ngOnChanges();
    component.Delete();

    fixture.detectChanges();

    expect(component.index).toBe(0);
    expect(storeMock.dispatch).toHaveBeenCalledWith(
        new TimetableActions.DeleteTimetable({index:component.index,selectedTimetable:component.timetable})
    );

  });
});
