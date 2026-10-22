// CONTROLLER - binder model og view sammen

import { getWeather } from "./model.js";
import { render, showStatus } from "./view.js";

let weather = null;
let selectedDay = 0;


export function start() {

  showStatus("Henter vejret...");

  update();
  updateEveryWholeHour();
}


// hent nyt vejr hver hele time (10:00, 11:00, 12:00 ...), mens siden er åben
function updateEveryWholeHour() {

  const now = new Date();
  const next = new Date(now);
  next.setHours(now.getHours() + 1, 0, 5, 0); // 5 sek. over, så vi er sikkert inde i den nye time

  setTimeout(function () {
    update();
    updateEveryWholeHour();
  }, next - now);
}


async function update() {

  try {
    weather = await getWeather();
  } catch (error) {
    showStatus("Kunne ikke hente vejret. Prøv igen senere.");
    return;
  }

  // navigator.onLine er ikke pålidelig, så vi viser i stedet hvornår data er fra
  showStatus("Opdateret kl. " + weather.updated);

  draw();
}


function draw() {
  try {
    render(weather, selectedDay, changeDay);
  } catch (error) {
    showStatus("Noget gik galt med at vise vejret.");
  }
}


function changeDay(index) {

  selectedDay = index;

  draw();
}
