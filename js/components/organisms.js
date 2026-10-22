// ORGANISMS - hele sektioner på siden

import { dayCard, hourRow, nowInfo } from "./molecules.js";
import { weekday } from "./atoms.js";


export function nowSection(now) {

  return `
    <section>
      <h2>Lige nu</h2>
      ${nowInfo(now)}
    </section>
  `;
}


export function forecastSection(days, selectedDay) {

  let cards = "";

  for (let i = 0; i < days.length; i++) {
    cards += dayCard(days[i], i, i === selectedDay);
  }

  return `
    <section>
      <h2>5 dages udsigt</h2>
      <div class="cards">${cards}</div>
    </section>
  `;
}


export function daySection(day) {

  let rows = "";

  // viser kun hver 3. time så listen ikke bliver for lang
  for (let i = 0; i < day.hours.length; i += 3) {
    rows += hourRow(day.hours[i]);
  }

  const name = weekday(day.date, "long");
  const title = name.charAt(0).toUpperCase() + name.slice(1);

  return `
    <section class="day-view">
      <h2>${title} time for time</h2>
      <ul>${rows}</ul>
    </section>
  `;
}
