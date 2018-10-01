export interface IPhoneNumber {
    number: number;
}

export interface IReferenceNumber {
    number: string;
}

export interface IGenerateStatus {
    ready: boolean;
    missing: boolean;
    totalNumbers: number;
}

export interface IGenerateResults {
    totalCount: number;
    numberVariants: string[];
}

