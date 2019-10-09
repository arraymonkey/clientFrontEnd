import { Internationalization } from '@syncfusion/ej2-base';
import { Predicate } from '@syncfusion/ej2-data';
export declare class CommonService {
    predicateStart: Predicate;
    predicateEnd: Predicate;
    predicate: Predicate;
    intl: Internationalization;
    constructor();
    getPredicate(start: Date, end: Date): Predicate;
    addRootClass(cls: string): void;
    removeRootClass(): void;
    objectAssign(e: any): object[];
    getDate(value: Date): string;
    getCurrencyVal(value: number): string;
    getNumberVal(value: number): string;
}
