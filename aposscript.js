function magnify(imgID, zoom) {
  const img = document.getElementById(imgID);
  const glass = document.createElement("DIV");
  glass.setAttribute("class", "img-magnifier-glass");
  img.parentElement.insertBefore(glass, img);

  const initMagnifier = () => {
    // Using unquoted URL to prevent SQL escaping errors. Safe because img.src is URL encoded.
    glass.style.backgroundImage = "url(" + img.src + ")";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    
    const bw = 3;
    const w = glass.offsetWidth / 2;
    const h = glass.offsetHeight / 2;

    // Mouse Events
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mouseenter", () => glass.style.display = "block");
    img.addEventListener("mouseleave", () => glass.style.display = "none");

    // Touch Events for Mobile
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchstart", () => glass.style.display = "block");
    img.addEventListener("touchend", () => glass.style.display = "none");

    function moveMagnifier(e) {
      e.preventDefault();
      const pos = getCursorPos(e);
      let x = pos.x;
      let y = pos.y;
      
      if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
      if (x < w / zoom) {x = w / zoom;}
      if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
      if (y < h / zoom) {y = h / zoom;}
      
      glass.style.left = (x - w) + "px";
      glass.style.top = (y - h) + "px";
      glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    }

    function getCursorPos(e) {
      let a, x = 0, y = 0;
      e = e || window.event;
      a = img.getBoundingClientRect();
      
      // Handle touch or mouse
      const pageX = e.pageX || e.touches[0].pageX;
      const pageY = e.pageY || e.touches[0].pageY;

      // Calculate cursor position relative to the image
      x = pageX - a.left - window.scrollX;
      y = pageY - a.top - window.scrollY;
      return {x : x, y : y};
    }
  };

  if (img.complete) {
    initMagnifier();
  } else {
    img.addEventListener("load", initMagnifier);
  }
}

magnify("myimage", 2);
