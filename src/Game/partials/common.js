const whiteBackground = (scene) => {
  const { width, height } = scene.scale;

  //White Background
  scene.add.rectangle(width / 2, height / 2, width, height, 0xffffff);
};

const coloredBackground = (scene, color) => {
  const { width, height } = scene.scale;

  //White Background
  scene.add.rectangle(width / 2, height / 2, width, height, color);
};

const addSprite = (scene, image, transform) => {
  const defaultTransform = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    originX: 0.5,
    originY: 0.5,
  };
  let targetTrasnform = {
    ...defaultTransform,
    ...transform,
  };
  const sprite = scene.add
    .image(targetTrasnform.x, targetTrasnform.y, image)
    .setOrigin(targetTrasnform.originX, targetTrasnform.originY);
  const aspectRatio = sprite.width / sprite.height;

  targetTrasnform = {
    ...targetTrasnform,
    width: sprite.width,
    height: sprite.height,
  };
  if (targetTrasnform.ratioFlag !== undefined) {
    if (targetTrasnform.ratioFlag) {
      targetTrasnform.width = targetTrasnform.height * aspectRatio;
    } else {
      targetTrasnform.height = targetTrasnform.width / aspectRatio;
    }
  }
  sprite.setDisplaySize(targetTrasnform.width, targetTrasnform.height);

  // Calculate aspect ratios
  // const imageAspect = sprite.width / sprite.height;
  // const screenAspect = width / height;

  // console.log(imageAspect, screenAspect);
  // if (imageAspect > screenAspect) {
  //   // Image is wider than the screen
  //   background.setDisplaySize(height * imageAspect, height);
  // } else {
  //   // Image is taller than the screen
  //   background.setDisplaySize(width, width / imageAspect);
  // }
};

const scaleBackground = (scene) => {
  const { width, height } = scene.scale;
  const background = scene.add.image(width / 2, height / 2, "Background");

  // Calculate aspect ratios
  const imageAspect = background.width / background.height;
  const screenAspect = width / height;

  if (imageAspect > screenAspect) {
    // Image is wider than the screen
    background.setDisplaySize(width, width / imageAspect);
  } else {
    // Image is taller than the screen
    background.setDisplaySize(height * imageAspect, height);
  }
  return background;
};
export { scaleBackground, whiteBackground, addSprite, coloredBackground };
