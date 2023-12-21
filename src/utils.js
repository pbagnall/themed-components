export function createElement(tag, klass, text) {
   const elem = document.createElement(tag);
   if (klass) elem.className = klass;
   if (text) elem.appendChild(document.createTextNode(text));
   return elem;
}