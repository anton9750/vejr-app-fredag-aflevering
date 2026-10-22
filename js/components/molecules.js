// MOLECULES - atoms sat sammen

import { weatherIcon, weatherText, temperature, rain, wind, weekday } from "./atoms.js";


export function dayCard(day, index, isSelected) {

  const name = weekday(day.date, "short");

  let className = "day-card";

  if (isSelected) {
    className += " selected";
  }

  return `
    <button class="${className}" data-day="${index}" aria-pressed="${isSelected}">
      <strong>${name}</strong>
      <span class="icon" aria-hidden="true">${weatherIcon(day.code)}</span>
      <span>${temperature(day.max)} / ${temperature(day.min)}</span>
      <small>${rain(day.rain)}</small>
    </button>
  `;
}


export function hourRow(hour) {

  return `
    <li class="hour">
      <span>${hour.time}</span>
      <span class="icon" title="${weatherText(hour.code)}">${weatherIcon(hour.code)}</span>
      <span>${temperature(hour.temp)}</span>
      <span>${rain(hour.rain)}</span>
      <span class="hour-wind">${wind(hour.wind, hour.windDir)}</span>
    </li>
  `;
}


export function nowInfo(now) {

  return `
    <p class="big-temp">
      <span class="icon" aria-hidden="true">${weatherIcon(now.code)}</span>
      ${temperature(now.temp)}
    </p>
    <p>${weatherText(now.code)}</p>
    <p>Vind: ${wind(now.wind, now.windDir)}</p>
    <p>Nedbør: ${rain(now.rain)}</p>
  `;
}
