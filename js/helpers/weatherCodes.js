// Oversætter vejrkode fra Open-Meteo til tekst og ikon

export function getWeatherType(code) {

  if (code === 0) {
    return { text: "Klart", icon: "☀️" };
  } else if (code === 1) {
    return { text: "Mest klart", icon: "🌤️" };
  } else if (code === 2) {
    return { text: "Delvist skyet", icon: "⛅" };
  } else if (code === 3) {
    return { text: "Overskyet", icon: "☁️" };
  } else if (code === 45 || code === 48) {
    return { text: "Tåge", icon: "🌫️" };
  } else if (code >= 51 && code <= 57) {
    return { text: "Støvregn", icon: "🌦️" };
  } else if (code >= 61 && code <= 67) {
    return { text: "Regn", icon: "🌧️" };
  } else if (code >= 71 && code <= 77) {
    return { text: "Sne", icon: "❄️" };
  } else if (code >= 80 && code <= 82) {
    return { text: "Regnbyger", icon: "🌦️" };
  } else if (code === 85 || code === 86) {
    return { text: "Snebyger", icon: "🌨️" };
  } else if (code >= 95 && code <= 99) {
    return { text: "Tordenvejr", icon: "⛈️" };
  } else {
    return { text: "Ukendt", icon: "❔" };
  }
}
