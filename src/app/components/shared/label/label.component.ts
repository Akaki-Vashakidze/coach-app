import { Clipboard } from '@angular/cdk/clipboard';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SnackbarService } from '../../../services/snackbar.service';
import { DotsPipe } from './dots.pipe';
import { TranslateModule } from '@ngx-translate/core';

type PRIMITIVE = string | undefined | number | null | boolean;
@Component({
  selector: 'app-label',
  standalone: true,
  imports: [MatIconModule, DotsPipe, TranslateModule],
  templateUrl: './label.component.html',
  styleUrl: './label.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent implements OnInit {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) value!: any;
  @Input() canCopy = false;
  @Input() hasMask = false;
  @Input() shortened = false;

  isTokenHidden = false;
  isShortened = false;

  public readonly clipboard = inject(Clipboard);
  public readonly snackBarService = inject(SnackbarService);

  ngOnInit(): void {
    if (this.hasMask) this.isTokenHidden = true;
    if (this.shortened) this.isShortened = true;
  }

  toggleDots() {
    this.isTokenHidden = !this.isTokenHidden;
  }

  copy(value: PRIMITIVE) {
    if (typeof value !== 'string') return;
    this.clipboard.copy(value);
    this.snackBarService.openSnackBar('copied_successfully', 'success');
  }
}
