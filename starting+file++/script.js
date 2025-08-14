let angleX = 0;
let angleY = 0;

function rotateCube() {
  angleX += 1;
  angleY += 1;
  $('.cube').css('transform', `rotateX(${angleX}deg) rotateY(${angleY}deg)`);
  requestAnimationFrame(rotateCube);
}

rotateCube();