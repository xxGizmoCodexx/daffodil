import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DaffMenuActivatorDirective } from './menu-activator/menu-activator.component';
import { DaffMenuItemComponent } from './menu-item/menu-item.component';
import { DaffMenuComponent } from './menu/menu.component';
import { DaffMenuService } from './service/menu.service';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
  ],
  declarations: [
    DaffMenuActivatorDirective,
    DaffMenuComponent,
    DaffMenuItemComponent,
  ],
  exports: [
    DaffMenuActivatorDirective,
    DaffMenuComponent,
    DaffMenuItemComponent,
  ],
  providers: [
    DaffMenuService,
  ],
})

export class DaffMenuModule {}
