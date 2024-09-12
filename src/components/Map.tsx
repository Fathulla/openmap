import { baseLayerGroup } from "@/lib/mapLayers";
import { Map, View } from "ol";
import "ol/ol.css";

interface IMapProps {
  //? Map Props
  zoom: number;
  center: [number, number];
  padding?: number[];

  //? Wrapper Props
}

export const MapComponent = ({ center, zoom, padding }: IMapProps) => {
  function mapInit() {
    const map = new Map({
      view: new View({
        center,
        zoom,
        padding,
        minZoom: 2,
        maxZoom: 10,
        
      }),
      layers: baseLayerGroup,
      target: "map-target",
    });

    map.on("click", (e) => console.log(e));
  }

  window.onload = mapInit;

  return <div id="map-target" className="w-screen h-screen"></div>;
};
