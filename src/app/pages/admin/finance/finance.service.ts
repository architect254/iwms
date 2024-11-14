import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BereavedMember } from '../../../core/entities/bereaved-member.entity';
import { DeactivatedMember } from '../../../core/entities/deactivated-member.entity';
import { DeceasedMember } from '../../../core/entities/deceased-member.entity';
import { Member } from '../../../core/entities/member.entity';
import { ApiService } from '../../../core/services/api.service';
import {
  Searchable,
  SearchDto,
  SearchOption,
} from '../../../shared/components/form-control/model';
import { Filter } from '../../../shared/views/grid/model';
import { BereavedMemberDto } from '../../../shared/views/is-bereaved-member-dialog/model';
import { DeceasedMemberDto } from '../../../shared/views/is-deceased-member-dialog/model';
import { DeactivatedMemberDto } from '../../../shared/views/is-deactivated-member-dialog/model';
import {
  BereavedMemberContribution,
  DeceasedMemberContribution,
  MembershipContribution,
  MembershipReactivationContribution,
  MonthlyContribution,
} from '../../../core/entities/contribution.entity';
import { BankAccountDto } from './upsert/bank-account/model';
import {
  BankAccount,
  PettyCashAccount,
} from '../../../core/entities/account.entity';
import { PettyCashAccountDto } from './upsert/petty-cash-account/model';
import { InternalFundsTransferExpenditureDto } from './upsert/internal-funds-transfer-expenditure/model';
import {
  ExternalFundsTransferExpenditure,
  InternalFundsTransferExpenditure,
} from '../../../core/entities/expenditure.entity';
import { ExternalFundsTransferExpenditureDto } from './upsert/external-funds-transfer-expenditure/model';

@Injectable({
  providedIn: 'root',
})
export class FinanceService extends ApiService {
  protected override endpoint = `${this.API_URL}/finances`;

  createAccount(
    payload: BankAccountDto | PettyCashAccountDto
  ): Observable<BankAccount | PettyCashAccount> {
    const endpoint = `${this.endpoint}/accounts`;
    return this.http.post<BankAccount>(endpoint, payload);
  }

  updateAccount(
    id: string,
    payload: BankAccountDto | PettyCashAccountDto
  ): Observable<BankAccount | PettyCashAccount> {
    const endpoint = `${this.endpoint}/accounts/${id}`;
    return this.http.put<BankAccount>(endpoint, payload);
  }

  getManyAccounts(
    page: number = 1,
    take: number = 100,
    filters?: Filter[]
  ): Observable<(BankAccount | PettyCashAccount)[]> {
    const queryString = this.buildFilterQueryString(page, take, filters);
    return this.http.get<(BankAccount | PettyCashAccount)[]>(
      `${this.endpoint}/accounts`,
      {
        params: new HttpParams({ fromString: queryString }),
      }
    );
  }

  getManyAccountsByWelfareId(
    id: string,
    page: number = 1,
    take: number = 100,
    filters?: Filter[]
  ): Observable<(BankAccount | PettyCashAccount)[]> {
    const queryString = this.buildFilterQueryString(page, take, filters);
    return this.http.get<(BankAccount | PettyCashAccount)[]>(
      `${this.endpoint}/accounts/by-welfare/${id}`,
      {
        params: new HttpParams({ fromString: queryString }),
      }
    );
  }

  getAccount(id: string): Observable<BankAccount | PettyCashAccount> {
    const endpoint = `${this.endpoint}/accounts/${id}`;
    return this.http.get<BankAccount | PettyCashAccount>(endpoint);
  }

  createExpenditure(
    payload:
      | InternalFundsTransferExpenditureDto
      | ExternalFundsTransferExpenditureDto
  ): Observable<
    InternalFundsTransferExpenditure | ExternalFundsTransferExpenditure
  > {
    const endpoint = `${this.endpoint}/expenditures`;
    return this.http.post<InternalFundsTransferExpenditure>(endpoint, payload);
  }

  updateExpenditure(
    id: string,
    payload:
      | InternalFundsTransferExpenditureDto
      | ExternalFundsTransferExpenditureDto
  ): Observable<
    InternalFundsTransferExpenditure | ExternalFundsTransferExpenditure
  > {
    const endpoint = `${this.endpoint}/expenditures/${id}`;
    return this.http.put<InternalFundsTransferExpenditure>(endpoint, payload);
  }

  getManyExpenditures(
    page: number = 1,
    take: number = 100,
    filters?: Filter[]
  ): Observable<
    (InternalFundsTransferExpenditure | ExternalFundsTransferExpenditure)[]
  > {
    const queryString = this.buildFilterQueryString(page, take, filters);
    return this.http.get<
      (InternalFundsTransferExpenditure | ExternalFundsTransferExpenditure)[]
    >(`${this.endpoint}/expenditures`, {
      params: new HttpParams({ fromString: queryString }),
    });
  }

  getManyExpendituresByWelfareId(
    id: string,
    page: number = 1,
    take: number = 100,
    filters?: Filter[]
  ): Observable<
    (InternalFundsTransferExpenditure | ExternalFundsTransferExpenditure)[]
  > {
    const queryString = this.buildFilterQueryString(page, take, filters);
    return this.http.get<
      (InternalFundsTransferExpenditure | ExternalFundsTransferExpenditure)[]
    >(`${this.endpoint}/expenditures/by-welfare/${id}`, {
      params: new HttpParams({ fromString: queryString }),
    });
  }

  getExpenditures(
    id: number | string
  ): Observable<
    InternalFundsTransferExpenditure | ExternalFundsTransferExpenditure
  > {
    const endpoint = `${this.endpoint}/expenditures/${id}`;
    return this.http.get<
      InternalFundsTransferExpenditure | ExternalFundsTransferExpenditure
    >(endpoint);
  }

  override search(searchDto: SearchDto): Observable<SearchOption[]> {
    const { page, take, term } = searchDto;
    const filters = [{ key: 'name', value: term }];
    const queryString = this.buildFilterQueryString(page, take, filters);
    const endpoint = `${this.endpoint}/accounts/search`;
    return this.http.get<SearchOption[]>(endpoint, {
      params: new HttpParams({ fromString: queryString }),
    });
  }
}
