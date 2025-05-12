// src/app/services/address.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private baseUrl = 'http://localhost:8080/api/addresses';

  constructor(private http: HttpClient) {}

  getAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(this.baseUrl);
  }

  createAddress(address: Omit<Address, 'id'>): Observable<Address> {
    return this.http.post<Address>(this.baseUrl, address);
  }
}
