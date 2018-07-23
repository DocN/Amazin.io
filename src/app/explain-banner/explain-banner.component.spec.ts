import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplainBannerComponent } from './explain-banner.component';

describe('ExplainBannerComponent', () => {
  let component: ExplainBannerComponent;
  let fixture: ComponentFixture<ExplainBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplainBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplainBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
