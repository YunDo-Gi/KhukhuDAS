import Experience from '../Experience.js'

export default class Room
{
    constructor()
    {
        this.experience = new Experience()
        this.renderer = this.experience.renderer
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.frames = {}
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