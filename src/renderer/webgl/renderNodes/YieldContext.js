/**
 * @author       Benjamin D. Richards <benjamindrichards@gmail.com>
 * @copyright    2013-2024 Phaser Studio Inc.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var Class = require('../../../utils/Class');
var RenderNode = require('./RenderNode');

/**
 * @classdesc
 * YieldContext is a RenderNode which sets the WebGL context to a default state,
 * ready for another renderer.
 *
 * This is used by the Extern Game Object to prepare the WebGL context for custom rendering.
 *
 * @class YieldContext
 * @memberof Phaser.Renderer.WebGL.RenderNodes
 * @constructor
 * @since 3.90.0
 * @extends Phaser.Renderer.WebGL.RenderNodes.RenderNode
 * @param {Phaser.Renderer.WebGL.RenderNodes.RenderNodeManager} manager - The manager that owns this RenderNode.
 */
var YieldContext = new Class({
    Extends: RenderNode,

    initialize: function YieldContext (manager)
    {
        RenderNode.call(this, 'YieldContext', manager);

        /**
         * The WebGL state to set when this node is run.
         * This is read-only.
         *
         * @name Phaser.Renderer.WebGL.RenderNodes.YieldContext#_state
         * @type {Partial<Phaser.Renderer.WebGL.Wrappers.WebGLGlobalWrapper>}
         * @private
         * @since 3.90.0
         * @readonly
         */
        this._state = {
            blend: this.manager.renderer.blendModes[0],
            vao: null
        };
    },

    /**
     * Sets the WebGL context to a default state.
     * This will flush any existing batch, set the blend mode to NORMAL,
     * and unbind any current VAO.
     *
     * @method Phaser.Renderer.WebGL.RenderNodes.YieldContext#run
     * @since 3.90.0
     * @param {Phaser.Renderer.WebGL.DrawingContext} displayContext - The context currently in use.
     */
    run: function (displayContext)
    {
        this.onRunBegin(displayContext);

        this.manager.startStandAloneRender();

        this.manager.renderer.glWrapper.update(this._state);

        this.onRunEnd(displayContext);
    }
});

module.exports = YieldContext;