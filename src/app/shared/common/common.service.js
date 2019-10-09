import { Injectable } from '@angular/core';
import { extend, Internationalization } from '@syncfusion/ej2-base';
import { Predicate } from '@syncfusion/ej2-data';
var CommonService = (function () {
    function CommonService() {
        this.intl = new Internationalization();
    }
    CommonService.prototype.getPredicate = function (start, end) {
        this.predicateStart = new Predicate('DateTime', 'greaterthanorequal', start);
        this.predicateEnd = new Predicate('DateTime', 'lessthanorequal', end);
        this.predicate = this.predicateStart.and(this.predicateEnd);
        return this.predicate;
    };
    CommonService.prototype.addRootClass = function (cls) {
        var ele = document.body;
        ele.classList.add(cls);
    };
    CommonService.prototype.removeRootClass = function () {
        var ele = document.body;
        ele.classList.remove('dashboard-page');
        ele.classList.remove('expense-page');
        ele.classList.remove('about-page');
    };
    CommonService.prototype.objectAssign = function (e) {
        var result = [];
        var obj;
        obj = extend(obj, e.result, {}, true);
        for (var data = 0; data < Object.keys(e.result).length; data++) {
            result.push(obj[data]);
        }
        return result;
    };
    CommonService.prototype.getDate = function (value) {
        return this.intl.formatDate(value, { skeleton: 'yMd', type: 'date' });
    };
    CommonService.prototype.getCurrencyVal = function (value) {
        return this.intl.formatNumber(value, { format: 'C0' });
    };
    CommonService.prototype.getNumberVal = function (value) {
        return this.intl.getNumberFormat({ skeleton: 'C0', currency: 'USD' })(value);
    };
    CommonService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    CommonService.ctorParameters = function () { return []; };
    return CommonService;
}());
export { CommonService };
//# sourceMappingURL=common.service.js.map