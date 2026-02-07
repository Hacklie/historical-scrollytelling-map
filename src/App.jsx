import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";
import { parseWikidataCoordinates } from "./utils/parseCoordinates";
import historicalData from "../data.json";
import MapController from "./components/MapController";
import StoryCard from "./components/StoryCard";
import "./config/leafletConfig";

export default function App() {
  const events = useMemo(() => {
    const parsed = historicalData
      .map((ev) => ({ ...ev, coordinates: parseWikidataCoordinates(ev.coord) }))
      .filter((ev) => ev.coordinates && Array.isArray(ev.coordinates));

    // Add total count to each event for display
    return parsed.map((ev) => ({ ...ev, totalCount: parsed.length }));
  }, []);

  const [activeEventIndex, setActiveEventIndex] = useState(0);

  const [mapCenter, setMapCenter] = useState(() => {
    if (events.length > 0 && events[0].coordinates)
      return events[0].coordinates;
    return [48.5, 10.0];
  });
  const [mapZoom, setMapZoom] = useState(6);

  // Navigation lock to prevent too-fast clicking
  const isNavigatingRef = useRef(false);

  const goToIndex = useCallback(
    (newIndex) => {
      // Prevent rapid navigation
      if (isNavigatingRef.current) return;

      // Clamp index to valid range
      const idx = Math.max(0, Math.min(newIndex, events.length - 1));

      // Lock navigation for 400ms
      isNavigatingRef.current = true;
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 400);

      setActiveEventIndex(idx);
      const coords = events[idx]?.coordinates;
      if (coords) {
        setMapCenter(coords);
        setMapZoom(8);
      }
    },
    [events],
  );

  const nextBattle = useCallback(() => {
    goToIndex(activeEventIndex + 1);
  }, [activeEventIndex, goToIndex]);

  const prevBattle = useCallback(() => {
    goToIndex(activeEventIndex - 1);
  }, [activeEventIndex, goToIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        nextBattle();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        prevBattle();
      } else if (e.key === "Home") {
        e.preventDefault();
        goToIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToIndex(events.length - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextBattle, prevBattle, goToIndex, events.length]);

  const onMarkerClick = useCallback(
    (index) => {
      goToIndex(index);
    },
    [goToIndex],
  );

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const activeEvent = events[activeEventIndex];

  return (
    <div className="app-container">
      <div className="story-panel" role="region" aria-label="Story list">
        <header className="story-header">
          <h1>Napoleonic Wars — 1805</h1>
          <p className="story-subtitle">
            An interactive timeline of major battles of the Third Coalition
          </p>
        </header>

        <div className="story-single">
          {activeEvent ? (
            <StoryCard event={activeEvent} index={activeEventIndex} />
          ) : (
            <p>No events available.</p>
          )}
        </div>

        <div className="story-controls">
          <button
            onClick={prevBattle}
            disabled={activeEventIndex === 0}
            aria-label="Previous battle"
            className="nav-button"
          >
            ← Previous Battle
          </button>
          <button
            onClick={nextBattle}
            disabled={activeEventIndex === events.length - 1}
            aria-label="Next battle"
            className="nav-button"
          >
            Next Battle →
          </button>
        </div>

        <footer className="story-footer">
          <p>Data from Wikidata | {events.length} events</p>
        </footer>
      </div>

      <div className="map-panel">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          className="leaflet-map"
          scrollWheelZoom={true}
          zoomControl={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <MapController center={mapCenter} zoom={mapZoom} />

          {events.map((event, idx) =>
            event.coordinates ? (
              <Marker
                key={event.event || idx}
                position={event.coordinates}
                opacity={idx === activeEventIndex ? 1 : 0.5}
                eventHandlers={{ click: () => onMarkerClick(idx) }}
              >
                <Popup>
                  <div className="popup-content">
                    <h3>{event.eventLabel}</h3>
                    <p>{event.eventDescription}</p>
                    <p>
                      <strong>{formatDate(event.date)}</strong>
                    </p>
                  </div>
                </Popup>
              </Marker>
            ) : null,
          )}
        </MapContainer>
      </div>
    </div>
  );
}
