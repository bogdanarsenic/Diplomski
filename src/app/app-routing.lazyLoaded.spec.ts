import { Router, Routes } from '@angular/router';
import { TestBed, async, ComponentFixture, fakeAsync, tick} from '@angular/core/testing';
import { Location } from '@angular/common';
import { NgModuleFactoryLoader } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationComponent } from 'src/app/navigation/navigation.component';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UnauthorizedUserModule } from './unauthorizedUser/unauthorizedUserModule.module';

const routes:Routes=[

        { path: 'signIn', loadChildren: ()=>import('./unauthorizedUser/unauthorizedUserModule.module').then(m=>m.UnauthorizedUserModule)},
  ]

describe('Lazy loaded Module',()=>{
    let fixture:ComponentFixture<AppComponent>;
    let component:AppComponent;
    let router:Router;
    let location:Location;
    let service:jasmine.SpyObj<AuthService>;
    

    beforeEach(async(()=>{
        TestBed.configureTestingModule({
            imports:[
                HttpClientTestingModule,
                RouterTestingModule.withRoutes(routes),
                UnauthorizedUserModule,
            ],
            declarations:[
                AppComponent,
                NavigationComponent
            ],
            providers:[
                {provide:AuthService,useValue:jasmine.createSpyObj('AuthService',['getRole'])}
            ]
        }).compileComponents();
        service=TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    }));

    beforeEach(()=>{
        router=TestBed.inject(Router);
        location=TestBed.inject(Location);

        fixture=TestBed.createComponent(AppComponent);

        component=fixture.componentInstance;

        router.initialNavigation();
    });

    it('should test the lazy loaded module',fakeAsync(()=>
    {
        router.navigateByUrl('/signIn/register');
        tick();
        fixture.detectChanges();
        expect(location.path()).toBe('/signIn/register');
    }))


})