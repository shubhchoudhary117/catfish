import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLoderComponent } from './page-loder.component';

describe('PageLoderComponent', () => {
  let component: PageLoderComponent;
  let fixture: ComponentFixture<PageLoderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageLoderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageLoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
