export const pipePassed = (pipe, turtleGraphics, scorePassed) => {

    const aBox = pipe.children[0].getBounds();
    const bBox = turtleGraphics.getBounds();
    if (aBox.x < bBox.x - bBox.width && !scorePassed){
        return true;
    }
    return false;
}