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
      div.label {
         display: flex;
         align-items: flex-start;
         box-sizing: border-box;
         width: fit-content;

         background-color: var(--label--background-color);
         color: var(--label--color);
         border: var(--label--border);

         font-family: var(--label--font-family);
         font-weight: 400;
         border-radius: var(--label--border-radius);

         margin: 0;

         padding: var(--label--padding);
         padding-top: 0;
         padding-bottom: 0;
         font-size: var(--label--font-size);
         gap: var(--label--gap);

         cursor: pointer;
      }

      div.text {
         text-overflow: ellipsis;
         overflow: hidden;
         line-height: var(--label--height);        
         white-space: var(--label--white-space, nowrap);
         max-width: var(--label--max-width);
      }

      .icon, .close {
         display: flex;
         align-items: center;
         flex-shrink: 0;
         padding: 0;
         margin: 0;
         height: var(--label--height);
         width: var(--label--icon-size);

         font-family: "Material Symbols Outlined";
         font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
         font-size: var(--label--icon-size);
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

      let label = ce('div','label');

      // icon
      if (iconName) label.appendChild(ce('div','icon', iconName));

      // text
      label.appendChild(ce('div','text',this.textContent));

      // close button
      this.closeButton = ce('div','close', 'close');
      this.closeButton.addEventListener('click', (event) => this.click(event));
      if (dismissable) label.appendChild(this.closeButton);

      this.shadowRoot.appendChild(label);
   }

   click(event) {
      console.log("click");
      let outboundEvent = new CustomEvent("dismiss", {
         detail: {},
         composed: true
      });
      this.dispatchEvent(outboundEvent);
   }

   // TODO: add mutation listener so that changes to DOM get reflected, to allow dynamic
   //       changes to 
}

window.addEventListener('load', () => {
   customElements.define("ul-label", Label);
});
