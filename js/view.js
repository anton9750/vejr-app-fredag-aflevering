// VIEW - sætter HTML ind på siden

import { nowSection, forecastSection, daySection } from "./components/organisms.js";

const app = document.getElementById("app");
const status = document.getElementById("status");


export function showStatus(text) {
  status.textContent = text;
}


export function render(weather, selectedDay, onDayClick) {

  // husk om brugeren stod på en dag-knap, så fokus ikke forsvinder
  const hadFocus = document.activeElement !== null && document.activeElement.classList.contains("day-card");

  app.innerHTML =
    nowSection(weather.now) +
    forecastSection(weather.days, selectedDay) +
    daySection(weather.days[selectedDay]);

  // klik på en dag
  const buttons = document.querySelectorAll(".day-card");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      onDayClick(Number(button.dataset.day));
    });
  });

  if (hadFocus) {
    buttons[selectedDay].focus();
  }
}
