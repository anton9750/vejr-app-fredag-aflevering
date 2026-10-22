// CONTROLLER - binder model og view sammen

import { getWeather } from "./model.js";
import { render, showStatus } from "./view.js";

let weather = null;
let selectedDay = 0;


export async function start() {

  showStatus("Henter vejret...");

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
