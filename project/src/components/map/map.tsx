import { useRef, useEffect } from 'react';
import { Icon, Marker } from 'leaflet';
import useMap from '../../hooks/useMap';
import { Offers } from '../../types/offer';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: Offers,
  activeOffer: number
};

const defaultCustomIcon = new Icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]});

const currentCustomIcon = new Icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]});

function MapCity({offers,activeOffer}: MapProps): JSX.Element {
  const currentCity = offers[0].city;
  const {location: {latitude: lat, longitude: lng, zoom}} = currentCity;
  const mapRef = useRef(null);
  const map = useMap(mapRef, currentCity);

  useEffect(() => {
    if (map) {
      offers.forEach(({ id, location: { latitude, longitude } }) => {
        const marker = new Marker({ lat: latitude, lng: longitude });
        marker
          .setIcon(
            id === activeOffer ? currentCustomIcon : defaultCustomIcon)
          .addTo(map);
      });
      map.flyTo([lat, lng], zoom);
    }
  }, [map, offers, activeOffer, lat, lng, zoom]);

  return <div style={{ height: '500px' }} ref={mapRef}></div>;
}
export default MapCity;
