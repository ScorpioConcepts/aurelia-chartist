var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "chartist"], function (require, exports, aurelia_framework_1, chartist) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartistElement = (function () {
        function ChartistElement() {
            this.eventsToAttachOnAttached = [];
            this.allowedTypes = ["Bar", "Line", "Pie"];
            this.instance = ChartistElement_1.nextInstance++;
        }
        ChartistElement_1 = ChartistElement;
        ChartistElement.prototype.attached = function () {
            this.element = document.getElementById("ct-chart-" + this.instance);
            this.renderChart();
        };
        ChartistElement.prototype.detached = function () {
            if (this.chart) {
                this.chart.detach();
            }
        };
        ChartistElement.prototype.dataChanged = function () {
            if (this.chart) {
                this.chart.update(this.data, this.options);
            }
            else {
                this.renderChart();
            }
        };
        ChartistElement.prototype.optionsChanged = function () {
            if (this.chart) {
                this.chart.update(this.data, this.options);
            }
        };
        ChartistElement.prototype.typeChanged = function () {
            this.renderChart();
        };
        ChartistElement.prototype.refresh = function () {
            if (this.chart) {
                this.renderChart();
            }
        };
        ChartistElement.prototype.renderChart = function () {
            if (!this.element) {
                return;
            }
            if (!this.data) {
                console.warn("Chartist data is not set on element");
                return;
            }
            if (this.type === undefined || this.type === null) {
                throw new Error("Chartist type attribute must be set");
            }
            if (this.allowedTypes.indexOf(this.type) === -1) {
                throw new Error("Chartist type must be one of the following values: " + this.allowedTypes.join(", "));
            }
            if (this.element) {
                this.chart = chartist[this.type.toString()](this.element, this.data, this.options, this.responsiveOptions);
            }
            for (var _i = 0, _a = this.eventsToAttachOnAttached; _i < _a.length; _i++) {
                var item = _a[_i];
                this.chart.on(item.name, item.value);
            }
        };
        var ChartistElement_1;
        ChartistElement.nextInstance = 1;
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", String)
        ], ChartistElement.prototype, "type", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", String)
        ], ChartistElement.prototype, "className", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], ChartistElement.prototype, "data", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], ChartistElement.prototype, "options", void 0);
        __decorate([
            aurelia_framework_1.bindable({ bindingMode: aurelia_framework_1.bindingMode.oneTime }),
            __metadata("design:type", Array)
        ], ChartistElement.prototype, "responsiveOptions", void 0);
        ChartistElement = ChartistElement_1 = __decorate([
            aurelia_framework_1.customElement("chartist"),
            __metadata("design:paramtypes", [])
        ], ChartistElement);
        return ChartistElement;
    }());
    exports.ChartistElement = ChartistElement;
});

//# sourceMappingURL=chartist.js.map
