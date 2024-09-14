import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";


export const OSMTileLayer = new TileLayer({
  source: new OSM(),
})