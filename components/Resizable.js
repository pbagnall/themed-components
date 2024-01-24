// Label API
// <ul-resizable>Content</ul-resizable>
//
// axes: which axes the container can be resized on. Options are hori, vert, both
// <ul-resizable axes='hori'>
// content
// </ul-resizable>

import { createElement as ce, createElement } from '../src/utils.js';

let resizableStyleTemplate = document.createElement('template');
resizableStyleTemplate.innerHTML = `
   <style>
      div#root {
         border: var(--border, 1px solid black);
         margin: var(--margin, 0);
         width: var(--width, 100%);
         padding: var(--padding, 0);

         display: grid;
         grid-template-columns: 1fr 5px;
         grid-template-rows: 1fr 5px;
         grid-template-areas: "content hori" "vert both";
      }

      slot { grid-area: content; }

      #content { overflow: var(--overflow, hidden); }

      #hori { grid-area: hori; background-color: #cccccc; cursor: ew-resize; }
      #vert { grid-area: vert; background-color: #cccccc; cursor: ns-resize; }
      #both { grid-area: both; background-color: #cccccc; cursor: nwse-resize; }

      #hori:hover,
      #vert:hover,
      #both:hover {
         background-color: #aaaaaa;
      }

      div#noghosts { position: absolute; left: -1000px; width: 1px; height: 1px; }
   </style>
   <div id='root'>
         <div id='content'><slot></slot></div>
         <div id='noghosts'></div>
   </div>`;

class Resizable extends HTMLElement {
   constructor() {
      super();
      this.attachShadow({ mode: 'open'});
      this.shadowRoot.appendChild(resizableStyleTemplate.content.cloneNode(true));

      this.hori = this.shadowRoot.getElementById('hori');
   }

   connectedCallback() {
      this.populate();

      const mutationHandler = (mutationList, observer) => { this.populate(); };
      const observer = new MutationObserver(mutationHandler);
      observer.observe(this, { attributes: true, childList: true, subtree: true, characterData: true });
   }

   populate() {
      this.root = this.shadowRoot.getElementById('root');
      this.cleanUp();

      const axes = this.getAttribute('axes')

      if (axes==='hori') {
         this.setupResize('hori', 'x');
         this.root.style.gridTemplateAreas = '"content hori"';
         this.root.style.gridTemplateRows = "1fr";
         this.root.style.gridTemplateColumns = "1fr 5px";

      } else if (axes === 'both' ) {
         this.setupResize('hori', 'x');
         this.setupResize('vert', 'y');
         this.setupBothResize();
         this.root.style.gridTemplateAreas = '"content hori" "vert both"';
         this.root.style.gridTemplateRows = "1fr 5px";
         this.root.style.gridTemplateColumns = "1fr 5px";
   
      } else if (axes==='vert') {
         this.setupResize('vert', 'y');
         this.root.style.gridTemplateAreas = '"content" "vert"';
         this.root.style.gridTemplateColumns = "1fr";
         this.root.style.gridTemplateRows = "1fr 5px";

      } else {
         this.root.style.gridTemplateAreas = '"content"';
         this.root.style.gridTemplateColumns = "1fr";
         this.root.style.gridTemplateRows = "1fr";
      }
   }

   cleanUp() {
      let child = this.root.children.item(2);
      while (child) {
         this.root.removeChild(child);
         child = this.root.children.item(2);
      }
   }

   setupResize(handle, axis) {
      this[handle] = createElement('div', null, null, { id: handle, draggable: true })
      this.root.appendChild(this[handle]);
      this.addDragListeners(this[handle], axis);
   }

   setupBothResize() {
      this.both = createElement('div', null, null, { id: 'both', draggable: true })
      this.root.appendChild(this.both);
      this.addDragListeners(this.both, 'x');
      this.addDragListeners(this.both, 'y');
   }

   addDragListeners(element, xOrY) {
      const widthOrHeight = xOrY.toLowerCase() === 'x' ? 'width' : 'height'
      const client = 'client'+xOrY.toUpperCase();
      const starting = 'starting'+widthOrHeight;

      element.addEventListener('dragstart', (event) => {
         this[starting] = parseInt(getComputedStyle(this.root)[widthOrHeight]);
         this[client] = event[client];
         event.dataTransfer.setDragImage(this.shadowRoot.getElementById('noghosts'), 0, 0);
      });

      element.addEventListener('drag', (event) => {
         this.root.style[widthOrHeight] = (this[starting] + event[client] - this[client]).toString(10)+"px";
      });
   }
}

window.addEventListener('load', () => {
   customElements.define("ul-resizable", Resizable);
});
