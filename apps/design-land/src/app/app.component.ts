import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  Injector,
  ComponentFactoryResolver,
} from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import {
  Observable,
  map,
  tap,
} from 'rxjs';

import {
  DaffBreakpoints,
  DaffSidebarMode,
  DaffSidebarModeEnum,
} from '@daffodil/design';
import { ACCORDION_EXAMPLES } from '@daffodil/design/accordion/examples';
import { ARTICLE_EXAMPLES } from '@daffodil/design/article/examples';
import { BUTTON_EXAMPLES } from '@daffodil/design/button/examples';
import { CALLOUT_EXAMPLES } from '@daffodil/design/callout/examples';
import { CARD_EXAMPLES } from '@daffodil/design/card/examples';
import { CHECKBOX_EXAMPLES } from '@daffodil/design/checkbox/examples';
import { CONTAINER_EXAMPLES } from '@daffodil/design/container/examples';
import { HERO_EXAMPLES } from '@daffodil/design/hero/examples';
import { IMAGE_EXAMPLES } from '@daffodil/design/image/examples';
import { INPUT_EXAMPLES } from '@daffodil/design/input/examples';
import { LIST_EXAMPLES } from '@daffodil/design/list/examples';
import { LOADING_ICON_EXAMPLES } from '@daffodil/design/loading-icon/examples';
import { MEDIA_GALLERY_EXAMPLES } from '@daffodil/design/media-gallery/examples';
import { MENU_EXAMPLES } from '@daffodil/design/menu/examples';
import { MODAL_EXAMPLES } from '@daffodil/design/modal/examples';
import { NAVBAR_EXAMPLES } from '@daffodil/design/navbar/examples';
import { NOTIFICATION_EXAMPLES } from '@daffodil/design/notification/examples';
import { PAGINATOR_EXAMPLES } from '@daffodil/design/paginator/examples';
import { QUANTITY_FIELD_EXAMPLES } from '@daffodil/design/quantity-field/examples';
import { RADIO_EXAMPLES } from '@daffodil/design/radio/examples';
import { SIDEBAR_EXAMPLES } from '@daffodil/design/sidebar/examples';

import { createCustomElementFromExample } from './core/elements/create-element-from-example';



@Component({
  selector: 'design-land-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class DesignLandAppComponent {
  faBars = faBars;

  public mode$: Observable<DaffSidebarMode>;

  public open = false;

  constructor(
    injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
    private breakpoint: BreakpointObserver,
  ) {
    [
      ...ARTICLE_EXAMPLES,
      ...ACCORDION_EXAMPLES,
      ...BUTTON_EXAMPLES,
      ...RADIO_EXAMPLES,
      ...CARD_EXAMPLES,
      ...CALLOUT_EXAMPLES,
      ...CHECKBOX_EXAMPLES,
      ...CONTAINER_EXAMPLES,
      ...HERO_EXAMPLES,
      ...LOADING_ICON_EXAMPLES,
      ...MEDIA_GALLERY_EXAMPLES,
      ...MENU_EXAMPLES,
      ...MODAL_EXAMPLES,
      ...NAVBAR_EXAMPLES,
      ...NOTIFICATION_EXAMPLES,
      ...QUANTITY_FIELD_EXAMPLES,
      ...LIST_EXAMPLES,
      ...PAGINATOR_EXAMPLES,
      ...IMAGE_EXAMPLES,
      ...INPUT_EXAMPLES,
      ...SIDEBAR_EXAMPLES,
    ].map((componentExample) => createCustomElementFromExample(componentExample, injector))
      .map((customElement) => {
        // Register the custom element with the browser.
        customElements.define(
          this.componentFactoryResolver.resolveComponentFactory(customElement.class).selector + '-example',
          customElement.element,
        );
      });
    this.open = this.breakpoint.isMatched(DaffBreakpoints.BIG_TABLET);
    this.mode$ = this.breakpoint.observe(DaffBreakpoints.BIG_TABLET).pipe(
      map((match) => match.matches ? DaffSidebarModeEnum.SideFixed : DaffSidebarModeEnum.Under),
    );
  }

  toggleOpen() {
    this.open = !this.open;
  }
}
