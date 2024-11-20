import { Component } from '@angular/core';
import { Location, PlatformLocation } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { Page } from '../../shared/directives/page/page.directive';
import { Config } from '../../core/entities/config.entity';

@Component({
  selector: 'iwms-page-not-found',
  standalone: true,
  imports: [MatToolbarModule, RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent extends Page {
  page_name!: string;
  home_content!: string;
  start!: string;
  end!: string;

  constructor(public location: PlatformLocation) {
    super();
    this.subscriptions.add(
      this.route.data.subscribe((data) => {
        const config: Config = data['config'];
        this.page_name = config?.page?.page_name;
        this.home_content = config?.page?.home_content;

        if (!this.page_name) {
          this.start = 'IW';
          this.end = 'MS';
        }
      })
    );
  }
  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
}
