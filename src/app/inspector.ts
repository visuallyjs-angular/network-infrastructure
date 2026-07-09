import {InspectorComponent, VisuallyJsModule} from '@visuallyjs/browser-ui-angular';
import {Component} from '@angular/core';
import {
  PROPERTY_COLOR, PROPERTY_DETAILS,
  PROPERTY_FILL,
  PROPERTY_LABEL,
  PROPERTY_LINE_STYLE,
  PROPERTY_OUTLINE
} from './constants';

@Component({
  selector: 'ni-inspector',
  standalone: true,
  imports: [VisuallyJsModule],
  styleUrls: ['../network-infrastructure.css'],
  template: `
    <div class="vjs-ni-inspector">
      @if (currentObjectType === 'Node' || currentObjectType === 'Group') {
        <div class="vjs-inspector-section">
          <label>Label</label>
          <input type="text" [attr.vjs-att]="PROPERTY_LABEL" vjs-focus="true"/>
        </div>

        <div class="vjs-inspector-type">Type: {{ currentType }}</div>

        <div class="vjs-inspector-section" style="margin-top: 0.5rem;">
          <label>Fill color</label>
          <vjs-color [propertyName]="PROPERTY_FILL"/>
        </div>

        <div class="vjs-inspector-section">
          <label>Outline color</label>
          <vjs-color [propertyName]="PROPERTY_OUTLINE"/>
        </div>

        <div class="vjs-inspector-section">
          <label>Details</label>
          <textarea rows="5" [attr.vjs-att]="PROPERTY_DETAILS"></textarea>
        </div>
      }

      @if (currentObjectType === 'Edge') {
        <div class="vjs-inspector-section">
          <label>Label</label>
          <input type="text" [attr.vjs-att]="PROPERTY_LABEL"/>
        </div>
        <div class="vjs-inspector-section">
          <label>Line style</label>
          <vjs-edge-type [propertyName]="PROPERTY_LINE_STYLE"/>
        </div>
        <div class="vjs-inspector-section">
          <label>Line color</label>
          <vjs-color [propertyName]="PROPERTY_COLOR"/>
        </div>
        <div class="vjs-inspector-section">
          <label>Details</label>
          <textarea rows="5" [attr.vjs-att]="PROPERTY_DETAILS"></textarea>
        </div>
      }

      @if (!currentObjectType) {
        <div class="vjs-ni-inspector-empty">
          <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
          <div>Select a node/group to inspect its properties.</div>
        </div>
      }
    </div>
  `
})
export class InfrastructureInspector extends InspectorComponent {
  PROPERTY_LABEL = PROPERTY_LABEL;
  PROPERTY_FILL = PROPERTY_FILL;
  PROPERTY_OUTLINE = PROPERTY_OUTLINE;
  PROPERTY_DETAILS = PROPERTY_DETAILS;
  PROPERTY_COLOR = PROPERTY_COLOR;
  PROPERTY_LINE_STYLE = PROPERTY_LINE_STYLE;
}
