/**
 * Parst Wikidata-Koordinaten im Format "Point(longitude latitude)"
 * @param {string} coordString - z.B. "Point(16.760277777 49.129444444)"
 * @returns {[number, number]} - [latitude, longitude] für Leaflet
 */
export function parseWikidataCoordinates(coordString) {
  if (!coordString || typeof coordString !== "string") {
    return null;
  }

  // Entferne "Point(" und ")"
  const coords = coordString.replace("Point(", "").replace(")", "");

  // Split bei Leerzeichen
  const [lon, lat] = coords.split(" ").map(parseFloat);

  // Leaflet erwartet [lat, lon]
  if (isNaN(lat) || isNaN(lon)) {
    return null;
  }

  return [lat, lon];
}
