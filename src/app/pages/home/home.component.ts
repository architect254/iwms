import { Component, Inject, SkipSelf } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Page } from '../../shared/directives/page/page.directive';
import { AuthComponent } from '../../shared/views/auth-dialog/auth-dialog.component';
import { AuthService } from '../../core/services/auth.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'iwms-home',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent extends Page {
  constructor(
    authService: AuthService,
    @Inject(DOCUMENT) document: Document
  ) {
    super(authService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
