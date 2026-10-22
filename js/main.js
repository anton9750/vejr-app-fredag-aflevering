import { start } from "./controller.js";

start();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js");
}

// vis loaderen i et sekund, og fad den så ud
setTimeout(function () {
  document.getElementById("loader").classList.add("hidden");
}, 1000);
