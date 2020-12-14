import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ImageUploadRoutingModule } from './image-upload-routing.module';
import { ImageUploadComponent } from './image-upload.component';

@NgModule({
    declarations:[
        ImageUploadComponent,
    ],
    imports: [
        SharedModule,
        RouterModule,
        ImageUploadRoutingModule, 
      ]

})

export class ImageUploadModule { }

