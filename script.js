var c = document.createElement("CANVAS");
w = 700;
h = 500;
xofs = 100;
yofs = 20;
xsize = 19;
ysize = 20;
var mX = 0;
var mY = 0;
var brush = 0;

c.width = w; //kakve su ovo pobogu dimenzije? 
c.height = h; //što sam trošio u tim danima?
document.body.appendChild(c); //dodaje u html
var ctx = c.getContext("2d");
ctx.textAlign = "center";
ctx.textBaseline = "middle";
c.addEventListener("pointerdown", dmd);

var m = []; //fg
var b = []; //bg
var budale = ["Balažin", "Glavaš", "Peras", "Blažić"]
var brojBudala = budale.length;
var smjene = [".", "24", "16", "8", "K", "L", "Đ"];

var boje = ["#000000", "#c0c0c0", "#a0a0a0", "#ffff00", "#00ff00", "#ff0000"];
reinit();
redraw();

function reinit() {
  for (let i = 0; i < 32; i++)
    for (let j = 0; j < brojBudala * 2; j++) {
      m[i + j * 32] = 0;
      b[i + j * 32] = 1;
    }
  m=[3,0,5,0,1,0,5,1,0,5,1,0,0,4,0,0,0,0,0,1,0,3,0,1,0,0,3,4,1,0,0,0,5,0,4,0,0,4,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,3,1,5,5,3,0,1,0,3,1,0,4,0,0,0,0,0,0,0,0,0,1,0,3,2,0,0,0,0,0,0,0,5,0,4,4,0,0,0,4,5,0,0,5,0,0,0,0,0,0,4,0,0,0,5,0,0,0,0,1,0,3,0,0,0,4,0,3,0,0,0,3,1,0,1,0,0,1,0,4,1,5,5,1,0,4,1,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,5,0,5,0,0,0,0,4,5,0,4,0,0,0,0,0,5,0,0,0,4,3,1,0,0,0,0,0,0,0,0,0,1,0,4,5,1,0,0,3,1,4,1,0,0,1,5,3,4,5,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,5,0,0,0,0,0,0,0,0,0,4,0,0] 
  b=[1,5,1,1,2,1,1,1,5,1,1,2,4,4,4,4,4,1,2,1,1,1,5,1,1,2,1,1,1,5,0,1,1,5,1,1,2,1,5,1,5,1,1,2,1,5,1,5,1,1,2,1,5,1,5,1,1,2,1,5,1,5,0,1,1,1,1,1,2,1,1,1,1,1,1,2,1,1,1,1,1,1,2,4,4,4,4,4,1,2,1,1,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1,2,1,1,1,1,1,1,2,1,1,1,1,1,1,2,1,1,1,1,0,1,1,1,1,1,2,4,4,5,1,1,1,2,1,1,1,1,1,1,2,1,1,1,1,1,1,2,1,1,1,1,0,1,1,1,1,1,2,1,1,5,1,1,1,2,1,1,1,1,1,1,2,1,1,1,1,1,1,2,1,1,1,1,0,1,1,1,1,1,4,4,4,4,4,4,4,4,1,5,1,1,1,1,2,1,1,1,1,1,1,2,1,1,1,1,0,1,1,1,1,1,2,5,5,5,5,5,1,2,1,5,1,1,1,1,2,1,1,1,1,1,1,2,1,1,1,1,0,1]
}

function countif(kojabudala, kojitoken, popodne) {
  let r = 0;
  for (let i = 0; i < 31; i++) {
    if (m[i + kojabudala * 64 + popodne * 32] == kojitoken) r++;
    if (b[i + kojabudala * 64 + popodne * 32] == kojitoken - 100) r++;
  }

  return r;
}

function drawBit(koji, gdjex, gdjey) {
  outx = gdjex * xsize + xofs; outy = gdjey * ysize + yofs;
  ctx.fillStyle = boje[0];
  ctx.font = "14px Arial";
  var tx = "22";
  if (koji < 0) { //lijepi okviri
    ctx.fillStyle = "#ffffff";
    for (let i = 0; i < brojBudala; i++)
      ctx.fillRect(10, yofs + ysize * (i * 2), w - 15, yofs * 7 / 4);
    ctx.fillStyle = "#000000";
    for (let i = 0; i < brojBudala; i++)
      ctx.fillRect(10, yofs + ysize * (i * 2) - 1, w - 15, 1);
    return 0;
  }
  if ((koji > 0) && (koji < 32)) { //crta dane u mjesecu
    tx = koji + "";
    ctx.fillText(tx, outx + xsize / 2, outy + ysize / 2);
  } else if (koji < 70) {
    tx = smjene[koji - 60];
    ctx.fillText(tx, outx + xsize / 2, outy + ysize / 2);
  } else if (koji < 80) { //ispisuje k i l ispod stupca gdje ga ima
    for (let i = 0; i < 31; i++) {
      let flaggie = 11;
      for (let j = 0; j < brojBudala * 2; j++) {
        if ((m[i + j * 32] == 4)) flaggie-=1;
        if ((m[i + j * 32] == 5)) flaggie-=10;
      }
      if (flaggie != 0) ctx.strokeText("!", xofs + i * xsize + xsize / 2, yofs + ysize * 2 * brojBudala + ysize);
    }
  } else if (koji < 90) { //imena budala
    tx = budale[koji - 80];
    ctx.fillText(tx, xofs / 2, yofs + ysize * 2 * (koji - 80) + ysize); //gornja serija
    let zy = yofs + ysize * ((koji - 80) * 2 + brojBudala * 2 + 2); //bazna linija za donju seriju
    ctx.fillText(tx, xofs / 2, zy + ysize);
    if (koji == 80) { //headeri za vrste radova i boje
      for (let j = 0; j < smjene.length; j++)
        ctx.fillText(smjene[j], xofs + xsize * j, zy);
      for (let j = 0; j < boje.length; j++) {
        ctx.fillStyle = boje[j];
        ctx.fillRect(xofs + xsize * (j + smjene.length) - xsize / 2, zy - ysize / 2, xsize - 1, ysize - 1);
      }
      ctx.fillStyle = boje[0];
    }
    for (let i = 0; i < smjene.length; i++) { //headeri za vrste smjena
      ctx.fillText(countif(koji - 80, i, 0), xofs + i * xsize, zy + ysize); //prijepodne
      ctx.fillText(countif(koji - 80, i, 1), xofs + i * xsize, zy + ysize * 2); //popodne
    }
    for (let i = 0; i < boje.length; i++) { //headeri za vrste dana
      ctx.fillText(countif(koji - 80, i + 100, 0), xofs + (i + smjene.length) * xsize, zy + ysize);
      ctx.fillText(countif(koji - 80, i + 100, 1), xofs + (i + smjene.length) * xsize, zy + ysize * 2);
    }
  } else if (koji > 100) { //pozadinski kvadratići
    ctx.fillStyle = boje[koji - 100];
    ctx.fillRect(outx, outy, xsize - 1, ysize - 1);
  }
}

function redraw() {
  ctx.fillStyle = "#dddddd";
  ctx.fillRect(0, 0, w, h); //clrscr
  drawBit(-1, 0, 0);  //okviri
  for (let i = 0; i < 31; i++) drawBit(i + 1, i, -1); //dani
  for (let i = 0; i < 31; i++)
    for (let j = 0; j < brojBudala * 2; j++) {
      drawBit(b[i + j * 32] + 100, i, j); //za svaki dan i svaku budalu prvo nacrtaj pozadinu a onda i smjenu
      drawBit(m[i + j * 32] + 60, i, j);
    }
  for (let i = 0; i < brojBudala; i++) drawBit(80 + i, 0, 0);
  drawBit(78, 0, 0); //ispisuje ! ispod stupca gdje nema k i l
}

function dmd(ev) {
  mX = ev.offsetX;
  mY = ev.offsetY;
  cx = ~~((mX - xofs) / xsize);
  cy = ~~((mY - yofs) / ysize);
  //if (brush<100) m[cx+cy*32]=brush;
  console.log(cx + ":" + cy);
  if ((cx >= 0) && (cx < 31) && (cy >= 0) && (cy < brojBudala * 2)) {
    if (brush < smjene.length) { m[cx + cy * 32] = brush; } else { b[cx + cy * 32] = brush - smjene.length; }
  }
  redraw();
}

document.onkeypress = function (evt) {
  evt = evt || window.event;
  var charCode = evt.keyCode || evt.which;
  var charStr = String.fromCharCode(charCode);
  if ((charCode == 49) || (charCode == 50)) brush += (charCode - 49) * 2 - 1;

  if (brush < 0) brush = 0;
  console.log(brush);
  if (brush > smjene.length + boje.length - 1) brush = smjene.length + boje.length - 1;
  if (charCode == 51) {
    document.getElementById("fubar").innerHTML = "m=[" + m + "];\nb=[" + b + "];\n"; 
    //najgluplji save feature ikada
  }
}
