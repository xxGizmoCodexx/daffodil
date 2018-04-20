import { TestBed, inject } from '@angular/core/testing';

import { MockService } from './mock.service';
import { ProductTestingService } from '@daffodil/product/testing/services/product.testing.service';
import { ProductTestingModule } from '@daffodil/product/testing/product-testing.module';

describe('MockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ProductTestingModule
      ],
      providers: [
        MockService
      ]
    });
  });

  it('should be created', inject([MockService], (service: MockService) => {
    expect(service).toBeTruthy();
  }));
});
