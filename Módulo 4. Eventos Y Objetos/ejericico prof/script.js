var parrafos = document.getElementsByTagName('p');
var cuerpo = document.getElementById('cuerpo');

alert(parrafos.length);
var h2 = document.createElement('h2');
h2.innerHTML = 'Parrafo 6';

var p = document.createElement('p');
p.innerHTML = 'Texto del nuevo párrafo';

cuerpo.appendChild(h2);
cuerpo.appendChild(p);