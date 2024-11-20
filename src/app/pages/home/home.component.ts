import { Component, Inject, SkipSelf } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Page } from '../../shared/directives/page/page.directive';
import { AuthService } from '../../core/services/auth.service';
import { DOCUMENT } from '@angular/common';
import { AuthComponent } from '../../shared/views/auth-dialog/auth-dialog.component';
import { Config } from '../../core/entities/config.entity';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'iwms-home',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent extends Page {
  page_name!: string;
  home_content!: string;
  start!: string;
  end!: string;
  constructor() {
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

  override ngOnInit(): void {
    super.ngOnInit();
  }

  login() {
    this.dialogRef = this.dialog.open(AuthComponent);
  }

  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
