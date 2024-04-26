import '../components/Label.js';
import '../components/Resizable.js';

function switchTheme(event) { 
   let theme = event.target.id;
   // Array.from(document.querySelectorAll('main section')).forEach(element => {
   //    element.className = theme;
   // });
   document.getElementsByTagName('body')[0].className = theme;

   let images = document.querySelectorAll('img');
   for (let image of images) {
      image.style.display = image.src.indexOf(theme)>=0 ? 'block' : 'none';
   }
}

addEventListener('load', () => {
   document.getElementById('masterbrand').addEventListener('change', (e) => switchTheme(e));
   document.getElementById('ultrus').addEventListener('change', (e) => switchTheme(e));
});
