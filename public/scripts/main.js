var e,n;function t(e,n,t){const o=document.createElement(e);return n&&(o.className=n),t&&o.appendChild(document.createTextNode(t)),o}(e=self.document)&&!e.getElementById("livereloadscript")&&((n=e.createElement("script")).async=1,n.src="//"+(self.location.host||"localhost").split(":")[0]+":35729/livereload.js?snipver=1",n.id="livereloadscript",e.getElementsByTagName("head")[0].appendChild(n));let o=document.createElement("template");o.innerHTML="\n   <style>\n      div {\n         display: inline-flex;\n         align-items: flex-start;\n\n         background-color: var(--background-color);\n         color: var(--color);\n         border: 1px solid var(--border-color);\n\n         border-radius: var(--border-radius);\n         padding: var(--padding);\n         font-family: var(--font-family);\n         font-size: var(--font-size);\n         gap: 8px;\n      }\n\n      .icon, .close {\n         font-family: \"Material Symbols Outlined\";\n         font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n         margin: 0;\n         position: relative;\n         top: 1px;\n\n         font-size: 1em;\n         width: 1em;\n      }\n\n      .close {\n         position: relative;\n\n         margin-right: -0.1875em;\n         top: 2px;\n      }\n   </style>";class i extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(o.content.cloneNode(!0))}connectedCallback(){let e=this.hasAttribute("dismissable"),n=this.getAttribute("icon");this.getAttribute("size");let o=t("div");o.appendChild(t("span","foo","​")),n&&o.appendChild(t("span","icon",n));for(let e of this.childNodes)o.appendChild(e);e&&o.appendChild(t("span","close","close")),this.shadowRoot.appendChild(o)}}window.addEventListener("load",(()=>{customElements.define("ul-label",i)}));
//# sourceMappingURL=main.js.map
