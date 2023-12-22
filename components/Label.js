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
         box-sizing: border-box;
         -moz-box-sizing: border-box;
         -webkit-box-sizing: border-box;
         overflow: hidden;

         background-color: var(--label--background-color);
         color: var(--label--color);
         border: var(--label--border);

         font-family: var(--label--font-family);
         font-weight: 400;
         border-radius: var(--label--border-radius);

         padding: var(--label--padding);
         font-size: var(--label--font-size);
         gap: var(--label--gap);
         height: var(--label--height);
         align-items: center;

         cursor: pointer;
      }

      .icon {
         margin-left: calc(var(--label--gap) * -1);
      }

      .icon, .close {
         font-family: "Material Symbols Outlined";
         font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
         font-size: var(--label--icon-size);
         width: var(--label--icon-size);
         align-self: center;
      }

      .close {
         position: relative;
      }

      .close:hover {
         font-variation-settings: 'FILL' 1, 'wght' 900, 'GRAD' 0, 'opsz' 24;
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

      if (iconName) {
         label.appendChild(ce('span','foo','\u200b'));
         label.appendChild(ce('span','icon', iconName));
      }
      for (let node of this.childNodes) {
         label.appendChild(node);
      }
      this.closeButton = ce('span','close', 'close');
      this.closeButton.addEventListener('click', (event) => this.click(event));
      if (dismissable) label.appendChild(this.closeButton);

      this.shadowRoot.appendChild(label);
   }

   click(event) {
      console.log("click");
      let outboundEvent = new CustomEvent("click", {
         detail: {},
         composed: true
      });
      this.dispatchEvent(outboundEvent);
   }
}

window.addEventListener('load', () => {
   customElements.define("ul-label", Label);
});
