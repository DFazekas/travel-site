import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll {
    constructor(elements, offset) {
        /* Order matters! CreateWaypoints requires Offset. */
        this.itemsToReveal = elements;
        this.offsetPercentage = offset;
        this.hideInitially();
        this.createWaypoints();
    }
    
    hideInitially() {
        /* Hide the 4 Feature items onload. */
        this.itemsToReveal.addClass("reveal-item");
    }
    
    createWaypoints() {
        var that = this;
        /*  */
        this.itemsToReveal.each(function() {
            var currentItem = this;
            new Waypoint({
                /* The DOM element we want to watch for as we scroll down the page. */
                element: currentItem,
                /* Handlers are what we want to happen when that element is scrolled to. */
                handler: function() {
                    /* Add class to scrolled item to become gradually visible. */
                    $(currentItem).addClass("reveal-item--is-visible");
                },
                /* Adjust the scroll point that triggers the handler. */
                offset: that.offsetPercentage
            });
        });
    }
}

export default RevealOnScroll;