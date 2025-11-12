import { ComponentDecorator } from './../../../node_modules/@ionic/angular/node_modules/ionicons/dist/types/stencil-public-runtime.d';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { PipesModule } from '../pipes/pipes-module';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components-module';
// 👇 Agrega esta línea
import { register } from 'swiper/element/bundle';
register();

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    PipesModule,
    ComponentsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [Tab1Page],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab1PageModule {}
