import {
  ApplicationRef,
  Component,
  InjectionToken,
  NgZone,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PageDirective } from './shared/page/page.directive';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { environment } from '../environments/environment';
import { Title, Meta } from '@angular/platform-browser';
import { SwUpdate } from '@angular/service-worker';
import { Subscription, first } from 'rxjs';
import { AppShellComponent } from './app-shell/app-shell.component';

export const API_BASE_URL = new InjectionToken('Dynamic API Base Url');

const apiFactory = () => {
  if (environment.production) {
    return ``;
  } else {
    return `localhost:3000`;
  }
};

@Component({
  selector: 'root',
  standalone: true,
  imports: [RouterOutlet, ScrollingModule, AppShellComponent],
  providers: [{ provide: API_BASE_URL, useFactory: apiFactory }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent extends PageDirective {

  constructor(
    _title: Title,
    _meta: Meta,
    appRef: ApplicationRef,
    zone: NgZone,
    private swUpdate: SwUpdate
  ) {
    super(_title, _meta);
    this.$subscription$.add(
      appRef.isStable.pipe(first((stable) => stable)).subscribe((t) =>
        zone.run(() => {
          this.checkForNewVersion();

          // Check for new version every minute
          setInterval(() => this.checkForNewVersion(), 60 * 1000);
        })
      )
    );
  }

  checkForNewVersion = async () => {
    try {
      // Check if Service Worker is supported by the Browser
      if (this.swUpdate.isEnabled) {
        // Check if new version is available
        const isNewVersion = await this.swUpdate.checkForUpdate();
        if (isNewVersion) {
          // Check if new version is activated
          const isNewVersionActivated = await this.swUpdate.activateUpdate();

          // Reload the application with new version if new version is activated
          if (isNewVersionActivated) window.location.reload();
        }
      }
    } catch (error) {
      console.error(
        `Service Worker - Error when checking for new version of the application: `,
        error
      );
      window.location.reload();
    }
  };
  override setTwitterCardMeta(): void {
    this.setMeta([
      {
        name: `twitter:title`,
        content: `@LoremIpsum`,
      },
      {
        name: `twitter:description`,
        content: `@LoremIpsum`,
      },
      {
        name: `twitter:card`,
        content: `@LoremIpsum`,
      },
      {
        name: `twitter:image`,
        content: `@LoremIpsum`,
      },
      {
        name: `twitter:site`,
        content: `https://www.yowhood.com`,
      },
      {
        name: `twitter:creator`,
        content: `Jared Bada - Code Links Industries Ltd`,
      },
    ]);
  }

  override setFacebookOpenGraphMeta(): void {
    this.setMeta([
      {
        name: `og:type`,
        content: `website`,
      },
      {
        name: `og:title`,
        content: `@LoremIpsum`,
      },
      {
        name: `og:description`,
        content: `@LoremIpsum`,
      },
      {
        name: `og:url`,
        content: `https://www.yowhood.com`,
      },
      {
        name: `og:site_name`,
        content: `Integrated Welfare Management System`,
      },
      {
        name: `og:locale`,
        content: `en_US`,
      },
      {
        name: `og:image`,
        content: `@LoremIpsum`,
      },
      {
        name: `og:image:type`,
        content: `image/png`,
      },
      {
        name: `og:image:width`,
        content: `1360`,
      },
      {
        name: `og:image:height`,
        content: `720`,
      },
      {
        name: `og:image:secure_url`,
        content: `@LoremIpsum`,
      },
    ]);
  }

  override setDefaultMetaAndTitle(): void {
    this.setTitle(`Integrated Welfare Management System - Wholesome Services For Integrated Welfare Management System`);
    this.setMeta([
      {
        name: `description`,
        content: `@LoremIpsum`,
      },
      {
        name: `keywords`,
        content: `@LoremIpsum`,
      },
    ]);
  }
}
