import { OSM } from "ol/source";
import { Group, Tile } from "ol/layer";

const openStreetMapStandard = new Tile({
  source: new OSM(),
  visible: true,
});

export const baseLayerGroup = new Group({
  layers: [openStreetMapStandard],
});
