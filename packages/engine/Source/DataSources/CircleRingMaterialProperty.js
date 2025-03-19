import Color from "../Core/Color.js";
import defined from "../Core/defined.js";
import Event from "../Core/Event.js";
import Frozen from "../Core/Frozen.js";
import JulianDate from "../Core/JulianDate.js";
import createPropertyDescriptor from "./createPropertyDescriptor.js";
import Property from "./Property.js";

const defaultColor = Color.RED;

/**
 * 指环圆材质
 * @constructor
 *
 * @param {object} [options] Object with the following properties:
 * @param {Property|Color} [options.color=Color.WHITE] The {@link Color} Property to be used.
 */
function CircleRingMaterialProperty(options) {
  options = options ?? Frozen.EMPTY_OBJECT;

  this._definitionChanged = new Event();
  this._color = undefined;
  this._colorSubscription = undefined;

  this.color = options.color;
}

Object.defineProperties(CircleRingMaterialProperty.prototype, {
  isConstant: {
    get: function () {
      return Property.isConstant(this._color);
    },
  },

  definitionChanged: {
    get: function () {
      return this._definitionChanged;
    },
  },

  color: createPropertyDescriptor("color"),
});

CircleRingMaterialProperty.prototype.getType = function (time) {
  return "CircleRing";
};

const timeScratch = new JulianDate();

CircleRingMaterialProperty.prototype.getValue = function (time, result) {
  if (!defined(time)) {
    time = JulianDate.now(timeScratch);
  }
  if (!defined(result)) {
    result = {};
  }
  result.color = Property.getValueOrClonedDefault(
    this._color,
    time,
    defaultColor,
    result.color,
  );

  return result;
};

CircleRingMaterialProperty.prototype.equals = function (other) {
  return (
    this === other ||
    (other instanceof CircleRingMaterialProperty &&
      Property.equals(this._color, other._color))
  );
};

export default CircleRingMaterialProperty;
