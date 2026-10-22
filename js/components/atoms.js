// ATOMS - de mindste dele

import { getWeatherType } from "../helpers/weatherCodes.js";
import { getDirectionName } from "../helpers/windDirection.js";

// vises når API'et mangler en værdi (null)
const MISSING = "–";


export function weatherText(code) {
  return getWeatherType(code).text;
}


export function weatherIcon(code) {
  return getWeatherType(code).icon;
}


export function temperature(value) {
  if (value == null) {
    return MISSING;
  }
  return Math.round(value) + "°";
}


export function rain(value) {
  if (value == null) {
    return MISSING;
  }
  return value.toFixed(1) + " mm";
}


export function wind(speed, degrees) {

  if (speed == null) {
    return MISSING;
  }

  if (degrees == null) {
    return speed.toFixed(1) + " m/s";
  }

  const name = getDirectionName(degrees);

  // pilen peger derhen hvor vinden blæser hen
  const arrow = '<span class="arrow" style="transform: rotate(' + (degrees + 180) + 'deg)" aria-hidden="true">↑</span>';

  return speed.toFixed(1) + " m/s " + arrow + " " + name;
}


// navn på ugedag, fx "ons." eller "onsdag"
export function weekday(date, format) {
  // kl. 12 så datoen ikke rykker en dag i andre tidszoner
  return new Date(date + "T12:00").toLocaleDateString("da-DK", { weekday: format });
}
