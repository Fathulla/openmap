import { OSM, XYZ } from "ol/source";
import { Group, Tile } from "ol/layer";

const openStreetMapStandard = new Tile({
  source: new OSM(),
  visible: true,
});

// FIXME: not working probably problems with url
const openStreetMapHumanitarian = new Tile({
  source: new OSM({
    url: "https://tile.openstreetmap.org/{zoom}/{x}/{y}.png",
  }),
  visible: false,
});

// FIXME: not working probably problems with url
const stamenTerrain = new Tile({
  source: new XYZ(),
  visible: false,
});

export const baseLayerGroup = new Group({
  layers: [openStreetMapStandard, openStreetMapHumanitarian, stamenTerrain],
});
