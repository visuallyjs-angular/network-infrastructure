import {Component} from '@angular/core';
import {VisuallyJsModule} from '@visuallyjs/browser-ui-angular';
import {Group, FlowchartBasicEdgeMappings} from '@visuallyjs/browser-ui';
import {INFRASTRUCTURE_SHAPES} from './infrastructure-shapes';
import {GRID_SIZE} from './constants';
import CATALOG from '../../catalog.json';
import {InfrastructureInspector} from './inspector';
import {TotalComponent} from './total';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [VisuallyJsModule, InfrastructureInspector, TotalComponent],
  templateUrl: './app.html',
  styleUrls: ['../network-infrastructure.css']
})
export class App {

  chartFontSpec = {
    size: 12
  };

  diagramOptions = {
    shapes: [INFRASTRUCTURE_SHAPES],
    grid: {
      size: GRID_SIZE
    },
    cells: {
      rotatable: false,
      showLabels: false,
      groups: {
        elastic: true,
        padding: 20
      },
      shouldDeleteGroupMembers: () => true
    },
    edges: {
      allowUnattached: false,
      propertyMappings: FlowchartBasicEdgeMappings(),
      deleteButton: "hover" as const,
      showLabels: true
    },
    lasso: true,
    zoomToFit: true,
    mediator: {
      canResize: (obj: any) => obj.objectType === "Group",
      canDrop: (obj: any, target: any) => {
        return target == null || !(obj.objectType === Group.objectType && target.objectType === Group.objectType)
      }
    }
  };

  pieChartOptions = {
    colorGenerator: {
      generate: (point: any) => (CATALOG as any)[point.data.id].color
    },
    labelFont: this.chartFontSpec,
    dataLabels: true,
    series: [
      {
        type: "summing-collation",
        categoryField: "type",
        sumField: "monthlyPrice"
      }
    ]
  };

  barChartOptions = {
    categoryAxis: {
      font: this.chartFontSpec
    },
    dataLabels: true,
    series: [
      {
        type: "collation",
        valueField: "type",
        color: "#445566"
      }
    ]
  };
}
