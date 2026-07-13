import cam1White from "../assets/cam-1-white.png";
import cam1Grey from "../assets/cam-1-grey.png";
import cam1Black from "../assets/cam-1-black.png";
import cam2White from "../assets/cam-2-white.png";
import cam2Black from "../assets/cam-2-black.png";
import cam3White from "../assets/cam-3-white.png";
import cam3Black from "../assets/cam-3-black.png";
import duoCamDoorbell from "../assets/wyze duo cam doorbell.png";
import batteryCamWhite from "../assets/wyze battary cam bro - white.png";
import batteryCamBlack from "../assets/wyze battary cam bro - black.png";
import motionSensor from "../assets/wyze sense mothion sensor.png";
import senseHub from "../assets/wyze sense hub (required).png";
import microsd256 from "../assets/wyze microsd card (256gb).png";

const PRODUCT_IMAGES = {
  "cam-v4": {
    white: cam1White,
    grey: cam1Grey,
    black: cam1Black,
  },
  "cam-pan-v3": {
    white: cam2White,
    black: cam2Black,
  },
  "floodlight-v2": {
    white: cam3White,
    black: cam3Black,
  },
  "duo-cam-doorbell": {
    default: duoCamDoorbell,
  },
  "battery-cam-pro": {
    white: batteryCamWhite,
    black: batteryCamBlack,
  },
  "motion-sensor": {
    default: motionSensor,
  },
  "sense-hub": {
    default: senseHub,
  },
  "microsd-256": {
    default: microsd256,
  },
};

export function getProductImageSrc(productId, variantId) {
  const productImages = PRODUCT_IMAGES[productId];
  if (!productImages) return null;

  if (variantId && productImages[variantId]) {
    return productImages[variantId];
  }

  return productImages.default ?? Object.values(productImages)[0] ?? null;
}
