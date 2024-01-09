export function createElement(tag, klass, text, attrs) {
   const elem = document.createElement(tag);
   if (klass) elem.className = klass;
   if (text) elem.appendChild(document.createTextNode(text));
   if (attrs) {
      for (let [key, value] of Object.entries(attrs)) {
         elem.setAttribute(key, value);
      }
   }

   return elem;
}