import { Map } from "ol";
import { useEffect, useState } from "react";
import {
  ViewConfig,
  OSMTileLayer,
  VectorLayerConfig,
} from "@/config/mapConfig";
import "ol/ol.css";

export const MapComponent = () => {
  const [selectedPoint, setSelectedPoint] = useState(null);

  // Обработчик клика по точке
  const handlePointClick = (point) => {
    const coords = point.getGeometry().getCoordinates();
    
    // Выполняем любое действие, например, открываем модальное окно
    setSelectedPoint(coords); // Можно сохранять координаты или данные точки
  };

  useEffect(() => {
    const map = new Map({
      target: "map-target",
      layers: [OSMTileLayer()],
      view: ViewConfig(),
    });

    map.addLayer(VectorLayerConfig(map, handlePointClick));
  }, []);

  return <div id="map-target" className="w-screen h-screen"></div>;
};
