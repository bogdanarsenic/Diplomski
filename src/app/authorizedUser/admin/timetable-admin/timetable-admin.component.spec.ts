import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AuthService } from 'src/app/auth/auth.service';
import { CoreModule } from 'src/app/core.module';
import { RouterTestingModule } from '@angular/router/testing';
import { TimetableAdminComponent } from './timetable-admin.component';
import { TimetableModule } from './timetable.module';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';

import * as fromApp from 'src/app/store/app.reducer';

const mockInitialAppState: fromApp.AppState = {
  timetable: {
    timetables: [],
    selectedTimetable: null,
  }
};


describe('TimetableAdminComponent - When an item is selected', () => {

    let store: MockStore<fromApp.AppState>;

    const updatedTimetableState: fromApp.AppState = {
        timetable: {
            timetables: [{Id:"",LineId:"",Type:"",Times:"",Day:""}],
            selectedTimetable: {Id:"",LineId:"",Type:"",Times:"",Day:""},
          }
      };

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule,TimetableModule,CoreModule, RouterTestingModule ],
        declarations: [ ],
        providers: [
          AuthService,
          provideMockStore({ initialState: { ...mockInitialAppState } })
        ]
      });
      store = TestBed.get<Store<fromApp.AppState>>(Store);
    });

    it('should have \'show = true\' which will implicate that select works',
      fakeAsync(() => {
        const fixture = TestBed.createComponent(TimetableAdminComponent);
        const componentInstance = fixture.componentInstance;


        tick();
        fixture.detectChanges();

        fixture.whenStable().then(() => {

           expect(componentInstance['show']).toEqual(false);

          store.setState({
            ...mockInitialAppState,
            timetable: 
              {
                  timetables:{...updatedTimetableState.timetable.timetables},
                  selectedTimetable:{...updatedTimetableState.timetable.selectedTimetable}
              }
            
          });

        });

        tick();
        fixture.detectChanges();

        expect(componentInstance['show']).toEqual(true);
        expect(componentInstance['timetable']).toEqual(updatedTimetableState.timetable.selectedTimetable);
      })
    );
  });
