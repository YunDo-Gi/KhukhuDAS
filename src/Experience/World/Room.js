export default class Room
{
    constructor()
    {

    }

    getModel()
    {
        return this.model
    }

    getLeftPostion()
    {
        return this.leftPosition
    }

    getRightPosition()
    {
        return this.rightPosition
    }

    getCenterPosition()
    {
        return this.centerPosition
    }

    getScale()
    {
        return this.scale
    }

    setBackground()
    {
        this.renderer.renderBackground(this.background)
    }

    getFramePosition()
    {
        return this.framePosition
    }

    getFrameRotation()
    {
        return this.frameRotation
    }
}