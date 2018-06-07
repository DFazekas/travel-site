import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from "jquery-smooth-scroll";

class StickyHeader {
    constructor() {
        /* Change site header transparency during scroll on larger screens. */
        this.siteHeader = $(".site-header");
        this.headerTriggerElement = $(".large-hero__title");
        this.createHeaderWaypoint();
        this.pageSections = $(".page-section");
        this.headerLinks = $(".primary-nav a");
        this.createPageSectionWaypoints();
        this.addSmoothScrolling();
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
