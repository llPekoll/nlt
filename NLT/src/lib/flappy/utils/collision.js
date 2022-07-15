export const collision = (pipe, turtleGraphics) => {

    const aBox = pipe.children[0].getBounds();
    const bBox = turtleGraphics.getBounds();
    const cBox = pipe.children[1].getBounds();
    if (
        aBox.x + aBox.width > bBox.x &&
        aBox.x < bBox.x + bBox.width &&
        aBox.y + aBox.height > bBox.y &&
        aBox.y < bBox.y + bBox.height
    ) {
        pipe.children[0].alpha = 0.5;
        return true;
    }
    if (
        cBox.x + cBox.width > bBox.x &&
        cBox.x < bBox.x + bBox.width &&
        cBox.y + cBox.height > bBox.y &&
        cBox.y < bBox.y + bBox.height
        ) {
        pipe.children[1].alpha = 0.5;
        return true;
    }
    return false;
}