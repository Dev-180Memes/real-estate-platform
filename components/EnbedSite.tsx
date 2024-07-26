import { useEffect, useRef, useState } from 'react';
import { Box } from '@chakra-ui/layout';

interface GoogleMapProps {
  apiKey: string;
  center: { lat: number; lng: number };
  query: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ apiKey, center, query }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (!map && mapRef.current) {
      const map = new google.maps.Map(mapRef.current, {
        center,
        zoom: 14,
      });
      setMap(map);
    }
  }, [map, center]);

  useEffect(() => {
    if (map) {
      const service = new google.maps.places.PlacesService(map);
      const request = {
        location: new google.maps.LatLng(center.lat, center.lng),
        radius: '1000',
        query,
      };

      service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          results?.forEach((place) => {
            if (place.geometry?.location) {
              new google.maps.Marker({
                map,
                position: place.geometry.location,
              });
            }
          });
          map.setCenter(results[0].geometry?.location);
        }
      });
    }
  }, [map, center, query]);

  return <Box ref={mapRef} height="400px" width="100%" />;
};

export default GoogleMap;
