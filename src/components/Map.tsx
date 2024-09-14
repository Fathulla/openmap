import { Feature, Map, View } from "ol";
import "ol/ol.css";
import { fromLonLat } from "ol/proj";
import VectorSource from "ol/source/Vector";
import { useEffect } from "react";
import * as data from "../lib/data.json";
import { Point } from "ol/geom";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import VectorLayer from "ol/layer/Vector";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";

interface IMapProps {
  //? Map Props
  zoom: number;
  center: [number, number];
  padding?: number[];

  //? Wrapper Props
}

export const MapComponent = ({ }: IMapProps) => {
  useEffect(() => {
    // Инициализация карты
    const map = new Map({
      target: 'map-target', // ID контейнера карты
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([58.674494, 25.493009]), // Установить центр карты
        zoom: 6, // Начальный зум
      }),
    });

    // Добавляем точки на карту
    const vectorSource = new VectorSource();

    data.coordinates.forEach(coord => {
      const point = new Feature({
        geometry: new Point(fromLonLat([coord.longitude, coord.latitude])),
      });

      // Устанавливаем стиль в зависимости от статуса
      point.setStyle(
        new Style({
          image: new Icon({
            src: coord.status ? "/icons/location-pin-blue.svg" :  "/icons/location-pin-red.svg",
            scale: 0.05, // размер иконки
          }),
        })
      );

      vectorSource.addFeature(point);
    });

    // Добавляем слой с точками на карту
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    map.addLayer(vectorLayer);

    // Фокусируемся на всех точках
    const extent = vectorSource.getExtent();
    map.getView().fit(extent, { padding: [50, 50, 50, 50] });

  }, []);

  return <div id="map-target" className="w-screen h-screen"></div>;
};
