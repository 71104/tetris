function Loader() {}

Loader.loadImage = function (path) {
  return new Promise(function (resolve, reject) {
    const image = new Image();
    image.src = `img/${path}.png`;
    image.onload = function () {
      image.onload = null;
      image.onerror = null;
      resolve(image);
    };
    image.onerror = function () {
      image.onload = null;
      image.onerror = null;
      reject(image);
    };
  });
};

