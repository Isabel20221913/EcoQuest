import { addButton, addText } from "../common";
import Phaser from "phaser";

/**
 * Makes a <BasicInfo> panel.
 *
 * @function createBasicInfo
 * @param {scene, left, top}
 * @returns {void}
 */
const BasicInfo = (scene, left, top) => {
  addButton(scene, "UserBell", left + 25, top + 25, () => {});
  addButton(scene, "Rubish", left + 25, top + 127, () => {});
  const graphics = scene.add.graphics();
  graphics.fillStyle(0x000000, 0.4);
  graphics.fillRoundedRect(left + 60, top + 9, 145, 32, 16);
  graphics.fillRoundedRect(left, top + 60, 205, 32, 16);
  graphics.fillRoundedRect(left + 60, top + 111, 145, 32, 16);
  graphics.fillStyle(0x23f52c, 1);
  const progressX = left + 60;
  const progressY = top + 111;
  const progressW = 20;
  const progressH = 32;
  const progressR = 16;
  // Start drawing the left-rounded rectangle
  graphics.beginPath();

  // Move to the top-left corner with rounding
  graphics.moveTo(progressX + progressR, progressY);

  // Draw top horizontal line to the right
  graphics.lineTo(progressX + progressW, progressY);

  // Draw right vertical line down (square corner)
  graphics.lineTo(progressX + progressW, progressY + progressH);

  // Draw bottom horizontal line back to the left
  graphics.lineTo(progressX + progressR, progressY + progressH);

  // Draw bottom-left rounded corner arc
  graphics.arc(
    progressX + progressR,
    progressY + progressR,
    progressR,
    Phaser.Math.DegToRad(90),
    Phaser.Math.DegToRad(270)
  );

  graphics.closePath();

  // Fill and stroke the shape
  graphics.fillPath();

  addText(
    scene,
    "Titanic House",
    left + 70,
    top + 14,
    "Kreon",
    "18px",
    "bold",
    "#ffffff",
    0,
    0,
    "#333333",
    3
  );

  addText(
    scene,
    "Population count: 10",
    left + 10,
    top + 65,
    "Kreon",
    "18px",
    "bold",
    "#ffffff",
    0,
    0
  );
};

export default BasicInfo;
