import { bindable, bindingMode, customElement } from "aurelia-framework";
import * as chartist from "chartist";

@customElement("chartist")
export class ChartistElement {
  public static nextInstance = 1;

  public element: HTMLElement;
  public chart: chartist.IChartistBase<chartist.IChartOptions>;

  @bindable()
  public type: "Bar" | "Line" | "Pie";

  @bindable()
  public className: string;

  @bindable()
  public data: chartist.IChartistData;

  @bindable()
  public options: chartist.IChartOptions;

  @bindable({ bindingMode: bindingMode.oneTime })
  public responsiveOptions: Array<chartist.IResponsiveOptionTuple<any>>;

  public eventsToAttachOnAttached = [];

  private readonly allowedTypes = ["Bar", "Line", "Pie"];
  private instance: number;

  constructor() {
    this.instance = ChartistElement.nextInstance++;
  }

  public attached() {
    this.element = document.getElementById(`ct-chart-${this.instance}`);
    this.renderChart();
  }

  public detached() {
    if (this.chart) {
      this.chart.detach();
    }
  }

  public dataChanged() {
    if (this.chart) {
      this.chart.update(this.data, this.options);
    } else {
      this.renderChart();
    }
  }

  public optionsChanged() {
    if (this.chart) {
      this.chart.update(this.data, this.options);
    }
  }

  public typeChanged() {
    this.renderChart();
  }

  public refresh() {
    if (this.chart) {
      this.renderChart();
    }
  }

  private renderChart() {
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
      throw new Error(
        `Chartist type must be one of the following values: ${this.allowedTypes.join(
          ", "
        )}`
      );
    }

    if (this.element) {
      this.chart = chartist[this.type.toString()](
        this.element,
        this.data,
        this.options,
        this.responsiveOptions
      );
    }

    // events that we tried to add before the object was created
    for (let item of this.eventsToAttachOnAttached) {
      this.chart.on(item.name, item.value);
    }
  }
}
