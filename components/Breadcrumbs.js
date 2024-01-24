// Breadcrumbs API
// <ul-breadcrumbs>
// <li>Item 1</li>
// <li>Item 2</li>
// </ul-breadcrumbs>

import { createElement as ce } from '../src/utils.js';

let breadcrumbsStyleTemplate = document.createElement('template');
breadcrumbsStyleTemplate.innerHTML = `
   <style>
      div#root {
         display: flex;
         align-items: center;
      }

      span { white-space: nowrap; }
      
      div {
         display: inline-block;
         margin:0;
         padding: 0;
      }

      .icon {
         display: inline-block;
         /* align-items: center; */
         flex-shrink: 0;
         padding: 0;
         margin: 0;
         height: var(--label--height);
         width: var(--label--icon-size);
         overflow: hidden;

         font-family: "Material Symbols Outlined";
         font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
         font-size: var(--label--icon-size);
      }
   </style>`;

class Breadcrumbs extends HTMLElement {
   constructor() {
      super();
      this.attachShadow({ mode: 'open'});
      this.shadowRoot.appendChild(breadcrumbsStyleTemplate.content.cloneNode(true));
   }

   connectedCallback() {
      this.populate();

      const mutationHandler = (mutationList, observer) => { this.populate(); };
      const observer = new MutationObserver(mutationHandler);
      observer.observe(this, { attributes: true, childList: true, subtree: true, characterData: true });
   }

   populate() {
      console.log('populating');
      let first = true;

      for (const node of this.children) {

         if (node.tagName.toLowerCase() === 'ul-breadcrumb') {
            if (!first) {
               this.shadowRoot.appendChild(ce('div','icon', 'chevron_right'));
            } else {
               first = false;
            }
            this.shadowRoot.appendChild(ce('div', '', node.textContent));
         }
      }

   }
}

window.addEventListener('load', () => {
   customElements.define("ul-breadcrumbs", Breadcrumbs);
});
