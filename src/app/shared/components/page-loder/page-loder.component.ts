import {
  ChangeDetectorRef, Component, EventEmitter,
  Input, OnChanges, OnInit, Output, SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-page-loder',
  standalone: true,
  imports: [],
  templateUrl: './page-loder.component.html',
  styleUrl: './page-loder.component.scss'
})
export class PageLoderComponent implements OnInit, OnChanges {

  @Output() loaded = new EventEmitter<void>();
  @Input() externalProgress: number = 0;
  @Input() externalMessage: string = 'INITIALIZING SYSTEM...';

  progress = 0;
  message = 'INITIALIZING SYSTEM...';
  fadeOut = false;
  hidden = false;
  private hasCompleted = false;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    // Apply immediately on init — don't wait for ngOnChanges
    this.progress = this.externalProgress;
    this.message = this.externalMessage;
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Always apply — no mode checks, no guards
    if (changes['externalProgress'] !== undefined) {
      this.progress = this.externalProgress;
    }
    if (changes['externalMessage'] !== undefined) {
      this.message = this.externalMessage;
    }
    this.cdr.detectChanges();

    if (this.progress >= 100 && !this.hasCompleted) {
      this.hasCompleted = true;
      this.completeAndHide();
    }
  }

  private completeAndHide() {
    setTimeout(() => {
      this.fadeOut = true;
      this.cdr.detectChanges();
      setTimeout(() => {
        this.hidden = true;
        this.loaded.emit();
        this.cdr.detectChanges();
      }, 750);
    }, 500);
  }
}