import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievedRequestsComponent } from './recieved-requests.component';

describe('RecievedRequestsComponent', () => {
  let component: RecievedRequestsComponent;
  let fixture: ComponentFixture<RecievedRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecievedRequestsComponent]
    });
    fixture = TestBed.createComponent(RecievedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
