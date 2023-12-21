// Label API
// <ul-label>Label</ul-label>
//
// Dismisssable: adding this attribute adds the dismiss control to the label, which fire an event when clicked.
// The value of this attribute is ignored, it's simple a flag.
// <ul-label dismissable>Label</ul-label>
//
// Icon: adds an icon before the text in the Label.
// Permitted values are the names of icons in the Material Icon font.
// <ul-label icon='cog'>Label</ul-label>
//
// Sets the size of the label. Valid sizes are [large, medium, small]
// <ul-label size=''>Label</ul-label>

import { createElement as ce } from '../src/utils.js';

let labelStyleTemplate = document.createElement('template');
labelStyleTemplate.innerHTML = `
   <style>
      div {
         display: inline-flex;
         align-items: flex-start;

         background-color: var(--background-color);
         color: var(--color);
         border: 1px solid var(--border-color);

         border-radius: var(--border-radius);
         padding: var(--padding);
         font-family: var(--font-family);
         font-size: var(--font-size);
         gap: 8px;
      }

      .icon, .close {
         font-family: "Material Symbols Outlined";
         font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
         margin: 0;
         position: relative;
         top: 1px;

         font-size: 1em;
         width: 1em;
      }

      .close {
         position: relative;

         margin-right: -0.1875em;
         top: 2px;
      }
   </style>`;

class Label extends HTMLElement {
   constructor() {
      super();
      this.attachShadow({ mode: 'open'});
      this.shadowRoot.appendChild(labelStyleTemplate.content.cloneNode(true));
   }

   connectedCallback() {
      let dismissable = this.hasAttribute('dismissable');
      let iconName = this.getAttribute('icon');
      let size = this.getAttribute('size');

      let label = ce('div');

      label.appendChild(ce('span','foo','\u200b'));
      if (iconName) label.appendChild(ce('span','icon', iconName));
      for (let node of this.childNodes) {
         label.appendChild(node);
      }
      if (dismissable) label.appendChild(ce('span','close', 'close'));

      this.shadowRoot.appendChild(label);
   }
}

window.addEventListener('load', () => {
   customElements.define("ul-label", Label);
});
