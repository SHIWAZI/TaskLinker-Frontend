import { useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function MapPicker({ onSelect }: any) {
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null);

  const handleClick = async (e: any) => {
    const { lng, lat } = e.lngLat;

    setMarker({ lat, lng });

    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`
    );

    const data = await res.json();
    const address = data.features?.[0]?.place_name || 'Unknown location';

    onSelect({ lat, lng, address });
  };

  return (
    <div className="w-full h-[280px] rounded-lg overflow-hidden border">
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        initialViewState={{
          latitude: 12.97,
          longitude: 80.25,
          zoom: 12
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{ width: '100%', height: '100%' }}
        onClick={handleClick}
      >
        {marker && (
          <Marker latitude={marker.lat} longitude={marker.lng}>
            📍
          </Marker>
        )}
      </Map>
    </div>
  );
}
