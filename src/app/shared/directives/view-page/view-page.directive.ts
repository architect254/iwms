import { Directive, SkipSelf } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Page } from '../page/page.directive';

@Directive({
  standalone: true,
})
export abstract class ViewPage extends Page {
  editUrl!: string;
  listUrl!: string;
}
