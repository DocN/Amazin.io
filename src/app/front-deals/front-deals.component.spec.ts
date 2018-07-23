import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontDealsComponent } from './front-deals.component';

describe('FrontDealsComponent', () => {
  let component: FrontDealsComponent;
  let fixture: ComponentFixture<FrontDealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontDealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
