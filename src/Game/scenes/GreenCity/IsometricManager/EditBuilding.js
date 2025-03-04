import { Buildings } from "../../../../utils/const";
import { calcIsForbidden } from "../../../../utils/utils";
import { addButton, addImage } from "../../../partials/common";
import { drawBuildings } from "./InitialMap";

const createEditBuildingContent = (
  scene,
  buildingId,
  x,
  y,
  isCreating = true,
  isRotate = false
) => {
  scene.isEditBuilding = true;
  scene.editBuilding = {
    x,
    y,
    isCreating,
    buildingId,
    isForbidden: calcIsForbidden(scene, x, y, buildingId),
    isRotate,
  };
  drawEditBuilding(scene);
};

const drawEditBuilding = (scene) => {
  const editBuilding = scene.editBuilding;
  const { width, height } = scene.scale;
  const isCreating = scene.editBuilding.isCreating;
  const tileWidth = 96;
  const tileHeight = 64;
  const tileX = ((editBuilding.x - editBuilding.y) * tileWidth) / 2;
  const tileY = ((editBuilding.x + editBuilding.y) * tileHeight) / 2;
  const displayX = width / 2 + tileX;
  const displayY = (-height * 2) / 5 + tileY;
  const building = Buildings.filter((v) => v.id === editBuilding.buildingId)[0];
  discardEditBuilding(scene);
  const buildingSprite = !editBuilding.isForbidden
    ? building.tile
    : building.tileOff;
  scene.editBuildingSprite = scene.add
    .sprite(displayX, displayY, buildingSprite)
    .setScale(editBuilding.isRotate ? -1 : 1, 1)
    .setOrigin(0.5, 1);
  const controlContent = scene.add.container(displayX, displayY);

  controlContent.add(
    addButton(
      scene,
      "DiscardButton",
      isCreating ? -50 : !building.isBuilding ? -25 : -75,
      -scene.editBuildingSprite.height - 30,
      () => {
        if (isCreating) {
          discardEditBuilding(scene);
          scene.isEditBuilding = false;
        } else {
          discardEditBuilding(scene);
          scene.isEditBuilding = false;
          const prevBuilding = scene.currentSelectedBuilding;

          for (let xIndex = 0; xIndex < prevBuilding.w; xIndex++) {
            for (let yIndex = 0; yIndex < prevBuilding.h; yIndex++) {
              scene.gameInitMap[prevBuilding.x - xIndex][
                prevBuilding.y - yIndex
              ] = {
                key: -1,
                x: prevBuilding.w - xIndex - 1,
                y: prevBuilding.h - yIndex - 1,
                w: prevBuilding.w,
                h: prevBuilding.y,
                isRotate: false,
              };
            }
          }
          scene.gameInitMap[prevBuilding.x][prevBuilding.y] = {
            key: prevBuilding.id,
            x: prevBuilding.w - 1,
            y: prevBuilding.h - 1,
            w: prevBuilding.w,
            h: prevBuilding.h,
          };
          drawBuildings(scene);
        }
      }
    )
  );
  if (building.isBuilding)
    controlContent.add(
      addButton(
        scene,
        "PlaceButton",
        isCreating ? 0 : -25,
        -scene.editBuildingSprite.height - 30,
        () => {
          if (!editBuilding.isForbidden) {
            discardEditBuilding(scene);
            scene.isEditBuilding = false;
            placeEditBuilding(scene);
          }
        }
      )
    );
  if (building.isBuilding)
    controlContent.add(
      addButton(
        scene,
        "RotateButton",
        isCreating ? 50 : 25,
        -scene.editBuildingSprite.height - 30,
        () => {
          scene.editBuilding = {
            ...scene.editBuilding,
            isRotate: !scene.editBuilding.isRotate,
          };
          drawEditBuilding(scene);
        }
      )
    );

  if (!isCreating) {
    controlContent.add(
      addButton(
        scene,
        "DestroyButton",
        building.isBuilding ? 75 : 25,
        -scene.editBuildingSprite.height - 30,
        () => {
          discardEditBuilding(scene);
          scene.isEditBuilding = false;
        }
      )
    );
  }

  //Building information
  const buildingInformation = scene.add.container(
    -scene.editBuildingSprite.width / 2 - 388,
    -scene.editBuildingSprite.height - 30
  );
  const infoImage = addImage(scene, "BuildingInfo", 0, 0)
    .setOrigin(0)
    .disableInteractive();
  const infoTitle = scene.add.text(20, 20, "HouseA", {
    fontFamily: "Kreon",
    fontSize: "24px",
    fontStyle: "Bold",
  });
  const infoText = scene.add
    .text(
      70,
      65,
      "Cost: $5,000\nResident Capacity: 10\nTax Income: $1 per Resident\nElectricity consumption: 10 units/Day\nWater usage: 2 unity/Day\nWaste produce: 2 unit/Day",
      {
        fontFamily: "Kreon",
        fontSize: "16px",
        lineSpacing: 21,
      }
    )
    .setOrigin(0);
  buildingInformation.add([infoImage, infoTitle, infoText]);

  controlContent.add(buildingInformation);
  scene.controlContent = controlContent;
};
const discardEditBuilding = (scene) => {
  if (scene.editBuildingSprite) {
    scene.editBuildingSprite.destroy();
  }
  if (scene.controlContent) {
    scene.controlContent.destroy();
  }
};
const placeEditBuilding = (scene) => {
  const editBuilding = scene.editBuilding;
  const building = Buildings.filter((v) => v.id === editBuilding.buildingId)[0];
  for (let i = 0; i < building.w; i++) {
    for (let j = 0; j < building.h; j++) {
      scene.gameInitMap[editBuilding.x - i][editBuilding.y - j] = {
        key: -1,
        x: building.w - i,
        y: building.h - j,
        w: building.w,
        h: building.h,
        isRotate: false,
      };
    }
  }
  scene.gameInitMap[editBuilding.x][editBuilding.y] = {
    key: editBuilding.buildingId,
    x: building.w - 1,
    y: building.h - 1,
    w: building.w,
    h: building.h,
    isRotate: editBuilding.isRotate,
  };
  drawBuildings(scene);
};

export default createEditBuildingContent;
export { drawEditBuilding, discardEditBuilding };
