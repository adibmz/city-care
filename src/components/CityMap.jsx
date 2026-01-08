import { useEffect, useMemo } from 'react';
import {
  CircleMarker,
  MapContainer,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvents
} from 'react-leaflet';

const DEFAULT_CENTER = [31.7917, -7.0926];

function MapClickHandler({ onSelect }) {
  useMapEvents({
    click(event) {
      onSelect({ lat: event.latlng.lat, lng: event.latlng.lng });
    }
  });
  return null;
}

function MapCenterUpdater({ center }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true });
  }, [center, map]);

  return null;
}

/**
 * @param {{
 *  markers: { id: string, lat: number, lng: number, label: string, status?: string }[],
 *  selectedId?: string | null,
 *  onMarkerClick?: (pinId: string) => void,
 *  onSelect?: (pos: { lat: number, lng: number }) => void,
 *  center?: [number, number],
 *  zoom?: number,
 *  ariaLabel?: string,
 *  heightClass?: string
 * }} props
 */
export default function CityMap(props) {
  const {
    markers,
    selectedId,
    onMarkerClick,
    onSelect,
    center,
    zoom = 12,
    ariaLabel = 'Carte des signalements',
    heightClass = 'h-72'
  } = props;

  const mapCenter = useMemo(() => center || DEFAULT_CENTER, [center]);
  const interactive = Boolean(onSelect);

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft ${heightClass}`}
      role="region"
      aria-label={ariaLabel}
    >
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapCenterUpdater center={mapCenter} />
        {interactive && onSelect && <MapClickHandler onSelect={onSelect} />}
        {markers.map((marker) => {
          const isSelected = marker.id === selectedId;
          return (
            <CircleMarker
              key={marker.id}
              center={[marker.lat, marker.lng]}
              radius={isSelected ? 9 : 6}
              pathOptions={{
                color: isSelected ? '#1f8a70' : '#4f6f86',
                fillColor: isSelected ? '#1f8a70' : '#1f8a70',
                fillOpacity: 0.9,
                weight: isSelected ? 3 : 2
              }}
              eventHandlers={{
                click: () => {
                  if (onMarkerClick) onMarkerClick(marker.id);
                }
              }}
            >
              <Tooltip direction="top" offset={[0, -6]} opacity={1}>
                {marker.label}
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
      {interactive && (
        <div className="absolute bottom-4 left-4 rounded-xl bg-white/90 px-3 py-2 text-xs text-slate-600 shadow">
          Cliquez sur la carte pour positionner le marqueur.
        </div>
      )}
    </div>
  );
}
