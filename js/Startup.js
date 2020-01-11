async function startup() {
  window.removeEventListener('DOMContentLoaded', startup);
  const images = await Promise.all([
    'red',
    'green',
    'blue',
    'cyan',
    'magenta',
    'yellow',
    'orange',
  ].map(path => Loader.loadImage(path)));
  const context = document.getElementById('canvas').getContext('2d');
  const overview = document.getElementById('overview').getContext('2d');
  const loop = new GameLoop(images, context, overview);
  loop.start();
}


window.addEventListener('DOMContentLoaded', startup);

