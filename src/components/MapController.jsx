import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

/**
 * MapController: Controls map flyTo animations when center/zoom changes
 * Only animates when user isn't currently interacting with the map
 */
export default function MapController({ center, zoom }) {
  const map = useMap();
  const prevCenterRef = useRef(null);
  const userInteracting = useRef(false);

  useEffect(() => {
    const onMoveStart = () => (userInteracting.current = true);
    const onMoveEnd = () => (userInteracting.current = false);
    const onZoomStart = () => (userInteracting.current = true);
    const onZoomEnd = () => (userInteracting.current = false);

    map.on("movestart", onMoveStart);
    map.on("moveend", onMoveEnd);
    map.on("zoomstart", onZoomStart);
    map.on("zoomend", onZoomEnd);

    return () => {
      map.off("movestart", onMoveStart);
      map.off("moveend", onMoveEnd);
      map.off("zoomstart", onZoomStart);
      map.off("zoomend", onZoomEnd);
    };
  }, [map]);

  useEffect(() => {
    if (!center) return;
    const prev = prevCenterRef.current;
    const changed =
      !prev ||
      prev[0] !== center[0] ||
      prev[1] !== center[1] ||
      map.getZoom() !== zoom;
    if (changed && !userInteracting.current) {
      map.flyTo(center, zoom, { duration: 1.2 });
      prevCenterRef.current = center;
    }
  }, [center, zoom, map]);

  return null;
}
