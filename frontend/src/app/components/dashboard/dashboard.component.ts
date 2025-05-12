import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AddressService } from '../../services/address.service';
import { User } from '../../models/user.model';
import { Address } from '../../models/address.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  addresses: Address[] = [];
  loading = true;
  error: string | null = null;
  currentUser: any;

  constructor(
    private userService: UserService, 
    private addressService: AddressService,
    private router: Router
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!this.currentUser.email) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadAddresses();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        this.users = Array.isArray(users) ? users : [];
        this.loading = false;
      },
      error: (err) => {
        this.handleError(err, 'usuários');
      }
    });
  }

  loadAddresses(): void {
    this.addressService.getAddresses().subscribe({
      next: (addresses: Address[]) => {
        this.addresses = Array.isArray(addresses) ? addresses : [];
        this.loading = false;
      },
      error: (err) => {
        this.handleError(err, 'endereços');
      }
    });
  }

  private handleError(error: any, resource: string): void {
    this.loading = false;
    if (error.status === 403) {
      this.error = `Você não tem permissão para ver ${resource}`;
    } else {
      this.error = `Erro ao carregar ${resource}`;
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
