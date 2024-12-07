import {
  ApplicationRef,
  Component,
  inject,
  NgZone,
  PLATFORM_ID,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Page } from './shared/directives/page/page.directive';
import { SwUpdate } from '@angular/service-worker';
import { first } from 'rxjs';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { AppShellComponent } from './shared/views/app-shell/app-shell.component';

@Component({
  selector: 'root',
  standalone: true,
  imports: [RouterOutlet, AppShellComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent extends Page {
  private readonly platform = inject(PLATFORM_ID);

  constructor(
    private swUpdate: SwUpdate,
    private appRef: ApplicationRef,
    private zone: NgZone
  ) {
    super();
    if (isPlatformBrowser(this.platform)) {
      // console.warn('browser');
      // Safe to use document, window, localStorage, etc. :-)
      // console.log(document);
    }

    if (isPlatformServer(this.platform)) {
      // console.warn('server');
      // Not smart to use document here, however, we can inject it ;-)
      // console.log(this.document);
    }

    this.subscriptions.add(
      this.appRef.isStable.pipe(first((stable) => stable)).subscribe((t) =>
        this.zone.run(() => {
          this.checkForNewVersion();

          // Check for new version every minute
          setInterval(() => this.checkForNewVersion(), 60 * 1000);
        })
      )
    );
  }

  override ngOnInit(): void {
    super.ngOnInit();
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
        content: `IWMS - Integrated Welfare Management System`,
      },
      {
        name: `twitter:description`,
        content: `IWMS - Integrated Welfare Management System`,
      },
      {
        name: `twitter:card`,
        content: `IWMS - Integrated Welfare Management System`,
      },
      {
        name: `twitter:image`,
        content: `IWMS - Integrated Welfare Management System`,
      },
      {
        name: `twitter:site`,
        content: `https://www.iwms.com`,
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
        content: `IWMS - Integrated Welfare Management System`,
      },
      {
        name: `og:description`,
        content: `IWMS - Integrated Welfare Management System`,
      },
      {
        name: `og:url`,
        content: `https://www.iwms.com`,
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
        content: `IWMS - Integrated Welfare Management System`,
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
        content: `IWMS - Integrated Welfare Management System`,
      },
    ]);
  }

  override setDefaultMetaAndTitle(): void {
    this.setTitle(
      `Integrated Welfare Management System - Managing Your Welfare`
    );
    this.setMeta([
      {
        name: `description`,
        content: `IWMS - Integrated Welfare Management System`,
      },
      {
        name: `keywords`,
        content: `IWMS - Integrated Welfare Management System`,
      },
    ]);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
