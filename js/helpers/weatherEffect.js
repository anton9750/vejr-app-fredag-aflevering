// Baggrundseffekt ud fra vejrkoden: regn eller solstråler

const fx = document.getElementById("weather-fx");


function isRain(code) {
  return (code >= 51 && code <= 67) || (code >= 80 && code <= 82) || code >= 95;
}


function isSunny(code) {
  return code === 0 || code === 1;
}


export function showWeatherEffect(code) {

  // til test: tilføj ?fx=rain eller ?fx=sun til adressen
  const test = new URLSearchParams(location.search).get("fx");

  let html = "";

  if (test === "rain" || (test === null && isRain(code))) {
    for (let i = 0; i < 90; i++) {
      const left = Math.random() * 100;
      const delay = Math.random() * 2;
      const duration = 0.5 + Math.random() * 0.5;
      html += '<span class="drop" style="left:' + left + '%;animation-delay:-' + delay
        + 's;animation-duration:' + duration + 's"></span>';
    }
    fx.className = "rain";
  } else if (test === "sun" || (test === null && isSunny(code))) {
    for (let i = 0; i < 6; i++) {
      html += '<span class="ray" style="animation-delay:-' + (i * 2.5) + 's"></span>';
    }
    fx.className = "sun";
  } else {
    fx.className = "";
  }

  fx.innerHTML = html;
}
