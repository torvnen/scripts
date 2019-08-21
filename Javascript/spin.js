a = document.querySelectorAll("body *");
b = 1;
setInterval(() => {
  for (var x of a.entries()) {
    x[1].style.transform = "rotate(" + b + "deg)";
  }
  b++;
}, 3);
