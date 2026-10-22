// MODEL - henter data fra Open-Meteo

const API_URL = "https://api.open-meteo.com/v1/forecast"
  + "?latitude=57.05&longitude=9.92"
  + "&current=temperature_2m,wind_speed_10m,wind_direction_10m,precipitation,weather_code"
  + "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum"
  + "&hourly=temperature_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m"
  + "&timezone=auto&forecast_days=5&wind_speed_unit=ms";


export async function getWeather() {

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Fejl: " + response.status);
  }

  const data = await response.json();

  return makeDays(data);
}


// laver data om til en liste med 5 dage, hvor hver dag har sine timer
function makeDays(data) {

  const days = [];

  for (let i = 0; i < data.daily.time.length; i++) {
    days.push({
      date: data.daily.time[i],
      code: data.daily.weather_code[i],
      max: data.daily.temperature_2m_max[i],
      min: data.daily.temperature_2m_min[i],
      rain: data.daily.precipitation_sum[i],
      hours: []
    });
  }

  for (let i = 0; i < data.hourly.time.length; i++) {

    // find dagen ud fra datoen, så dage med 23 eller 25 timer (sommertid) også passer
    const date = data.hourly.time[i].slice(0, 10);
    const day = days.find(function (d) {
      return d.date === date;
    });

    if (day) {
      day.hours.push({
        time: data.hourly.time[i].slice(11, 16),
        temp: data.hourly.temperature_2m[i],
        rain: data.hourly.precipitation[i],
        code: data.hourly.weather_code[i],
        wind: data.hourly.wind_speed_10m[i],
        windDir: data.hourly.wind_direction_10m[i]
      });
    }
  }

  return {
    now: {
      temp: data.current.temperature_2m,
      rain: data.current.precipitation,
      code: data.current.weather_code,
      wind: data.current.wind_speed_10m,
      windDir: data.current.wind_direction_10m
    },
    // tidspunktet for målingen, fx "14:15" - viser om data er gamle (fra cache)
    updated: data.current.time.slice(11, 16),
    days: days
  };
}
