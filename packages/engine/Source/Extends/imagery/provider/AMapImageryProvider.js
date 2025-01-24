import GCJ02TilingScheme from "../tiling-scheme/GCJ02TilingScheme.js";
import UrlTemplateImageryProvider from "../../../Scene/UrlTemplateImageryProvider.js";

const TILE_URL = {
  img: "//webst{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
  cia: "//webst{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}",
  vec: "//webst{s}.is.autonavi.com/appmaptile?style=9&x={x}&y={y}&z={z}",
};

/**
 * 高德地图ImageryProvider
 * @param {string} options.url 自定义链接
 * @param {string} options.crs WGS84
 * @param {string} options.style 地图类型 img:影像地图  vec:电子地图 cia:电子注记
 */
class AMapImageryProvider extends UrlTemplateImageryProvider {
  constructor(options = {}) {
    options["url"] =
      options.url ||
      [options.protocol || "", TILE_URL[options.style] || TILE_URL["img"]].join(
        "",
      );
    options["subdomains"] = options.subdomains || ["01", "02", "03", "04"];
    if (options.crs === "WGS84") {
      options["tilingScheme"] = new GCJ02TilingScheme();
    }
    super(options);
  }
}

export default AMapImageryProvider;
