const wrapper = document.getElementById("baWrapper");
const range = wrapper.querySelector(".ba-range");

range.addEventListener("input", function() {
  wrapper.style.setProperty("--position", `${this.value}%`);
});
