import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from "jquery-smooth-scroll";

class StickyHeader {
    constructor() {
        /* Recalculate Waypoints whenever a lazy image gets loaded in. */
        this.lazyImages = $(".lazyload");
        /* Change site header transparency during scroll on larger screens. */
        this.siteHeader = $(".site-header");
        this.headerTriggerElement = $(".large-hero__title");
        this.createHeaderWaypoint();
        this.pageSections = $(".page-section");
        this.headerLinks = $(".primary-nav a");
        this.createPageSectionWaypoints();
        this.addSmoothScrolling();
        this.refreshWaypoints();
    }
    
    refreshWaypoints() {
        /* Waypoints calculates the vertical spacing of its element when the document loads. 
         * However, lazyloaded images haven't been account for.
         * In order to fix this miscalculation, we refresh all Waypoints everytime any lazy image gets loaded. */
        this.lazyImages.on('load', function() {
            /* This also affects RevealOnScroll so no need to call twice. */
            Waypoint.refreshAll();
        });
    }
    
    addSmoothScrolling() {
        this.headerLinks.smoothScroll();
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
    
    createPageSectionWaypoints() {
        var that = this;
        /* Sets header link associated with waypoint to yellow. */
        this.pageSections.each(function() {
            var currentPageSection = this;
            new Waypoint({
                element: currentPageSection,
                handler: function(direction) {
                    if (direction === "down") {
                        var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
                        /* Reset all header link colors. */
                        that.headerLinks.removeClass("is-current-link");
                        /* Set current header link color to orange. */
                        $(matchingHeaderLink).addClass("is-current-link");
                    }
                },
                offset: "18%"
            });
            new Waypoint({
                element: currentPageSection,
                handler: function(direction) {
                    if (direction === "up") {
                        var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
                        /* Reset all header link colors. */
                        that.headerLinks.removeClass("is-current-link");
                        /* Set current header link color to orange. */
                        $(matchingHeaderLink).addClass("is-current-link");
                    }
                },
                offset: "-60%"
            });
        });
    }
}

export default StickyHeader;
