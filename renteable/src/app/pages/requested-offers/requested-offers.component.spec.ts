import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedOffersComponent } from './requested-offers.component';

describe('RequestedOffersComponent', () => {
  let component: RequestedOffersComponent;
  let fixture: ComponentFixture<RequestedOffersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestedOffersComponent]
    });
    fixture = TestBed.createComponent(RequestedOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
