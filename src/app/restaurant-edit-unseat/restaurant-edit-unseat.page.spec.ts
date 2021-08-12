import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RestaurantEditUnseatPage } from './restaurant-edit-unseat.page';

describe('RestaurantEditUnseatPage', () => {
  let component: RestaurantEditUnseatPage;
  let fixture: ComponentFixture<RestaurantEditUnseatPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantEditUnseatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantEditUnseatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
