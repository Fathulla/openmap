import { Feature, View } from "ol";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat } from "ol/proj";
import { OSM } from "ol/source";
import VectorSource from "ol/source/Vector";
import * as mapData from "@/data/data.json";
import { Point } from "ol/geom";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import { Select } from 'ol/interaction';
import { Map } from "ol";

//? Layers
export const OSMTileLayer = () => {
  return new TileLayer({
    source: new OSM(),
  });
};

//? Vector Layers
export const VectorLayerConfig = (map: Map, handleClick: (point: Feature<Point>) => void) => {
  const mapCoordinate = mapData.coordinates;

  const vectorSource = new VectorSource();

  mapCoordinate.forEach((coord) => {
    const feature = new Feature({
      geometry: new Point(fromLonLat([coord.longitude, coord.latitude])),
    });

    feature.setStyle(
      new Style({
        image: new Icon({
          src: coord.status
            ? "/icons/location-pin-blue.svg"
            : "/icons/location-pin-red.svg",
          scale: 0.05,
        }),
      })
    );

    const selectInteraction = new Select();
    map.addInteraction(selectInteraction);
  
    selectInteraction.on("select", (event) => {
      const selectedFeature = event.selected[0];
      
      // Проверяем, что выбранная геометрия является точкой
      if (selectedFeature && selectedFeature.getGeometry() instanceof Point) {
        const pointFeature = selectedFeature as Feature<Point>;
        handleClick(pointFeature); // Передаем точку в обработчик клика
      }
    });

    vectorSource.addFeature(feature);
  });

  // Фокусируемся на всех точках
  const extent = vectorSource.getExtent();
  map.getView().fit(extent, { padding: [50, 50, 50, 50] });

  return new VectorLayer({
    source: vectorSource,
  });
};

//? View
export const ViewConfig = () => {
  return new View({
    center: fromLonLat([58.674494, 25.493009]),
    zoom: 6,
  });
};
