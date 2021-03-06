import { useEffect, useState, MutableRefObject } from 'react';
import leaflet, { Map } from 'leaflet';
import { City } from '../types/offer';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../const';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: City): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const {location} = city;

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude,
        },
        zoom: location.zoom,
      });

      leaflet.tileLayer(
        URL_MARKER_DEFAULT,
        {
          attribution: URL_MARKER_CURRENT,
        },
      ).addTo(instance);

      setMap(instance);
    }
  }, [mapRef, map, location]);

  return map;
}

export default useMap;
