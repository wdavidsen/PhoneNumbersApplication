import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IPhoneNumber, IReferenceNumber, IGenerateStatus, IGenerateResults } from '../model/generate.model';

@Injectable()
export class PhoneCombinationService {

    // todo: add to config
    baseUrl = 'http://localhost:8080';
    commonHeaders = new HttpHeaders ({'Content-Type': 'application/json', 'Accept': 'application/json'});

    constructor(private http: HttpClient) {

    }

    generate(phoneNumber: IPhoneNumber): Observable<IReferenceNumber> {
        const url = this.baseUrl + '/variants/';
        const options = {headers: this.commonHeaders};

        return this.http.post<IReferenceNumber>(url, phoneNumber,  options)
            .pipe(catchError(this.handleError<IReferenceNumber>('generate')));
    }

    getStatus(referenceId: string): Observable<IGenerateStatus> {
        const url = this.baseUrl + '/variants/' + referenceId + '/status';
        const options = {headers: this.commonHeaders};

        return this.http.get<IGenerateStatus>(url, options)
            .pipe(catchError(this.handleError<IGenerateStatus>('load')));
    }

    load(referenceId: string, start: number, take: number): Observable<IGenerateResults> {
        const url = this.baseUrl + '/variants/' + referenceId + '?start=' + start + '&take=' + take;
        const options = {headers: this.commonHeaders};

        return this.http.get<IGenerateResults>(url, options)
            .pipe(catchError(this.handleError<IGenerateResults>('load')));
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}
