import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class StickyHeader {
    constructor() {
        /* Change site header transparency during scroll on larger screens. */
        this.siteHeader = $(".site-header");
        this.headerTriggerElement = $(".large-hero__title");
        this.createHeaderWaypoint();
    }
    
    createHeaderWaypoint() {
        var that = this;
        new Waypoint({
            /* Waypoints expects a native DOM element, 
             * use [0] to access pointer of native DOM element. */
            element: this.headerTriggerElement[0],
            handler: function(direction) {
                if (direction === "down") {
                    /* If approaching the element scrolling down, darken header. */
                    that.siteHeader.addClass("site-header--dark");
                } else {
                    /* If approaching the element scrolling up, lighten header. */
                    that.siteHeader.removeClass("site-header--dark");
                }
            }
        });
    }
}

export default StickyHeader;
