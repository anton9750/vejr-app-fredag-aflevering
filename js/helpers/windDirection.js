// Gør vindretning i grader om til bogstaver

export function getDirectionName(degrees) {

  if (degrees >= 337.5 || degrees < 22.5) {
    return "N";
  } else if (degrees < 67.5) {
    return "NØ";
  } else if (degrees < 112.5) {
    return "Ø";
  } else if (degrees < 157.5) {
    return "SØ";
  } else if (degrees < 202.5) {
    return "S";
  } else if (degrees < 247.5) {
    return "SV";
  } else if (degrees < 292.5) {
    return "V";
  } else {
    return "NV";
  }
}
