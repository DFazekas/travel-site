import $ from 'jquery';

class MobileMenu {
    constructor() {
        this.siteHeader = $(".site-header"); // Used for togging transparency for menuContent for mobile.
        this.menuIcon = $(".site-header__menu-icon"); // Used for onclick handler for mobile.
        this.menuContent = $(".site-header__menu-content"); // Used for toggling visibility for mobile.
        this.events();
    }
    
    events() {
        // .toggleTheMenu 'this' value initially points to the DOM of what triggered it - undesired.
        // Using .bind() overwrites default 'this' - we want the same menu-content 'this' is currently pointing to. 
        this.menuIcon.click(this.toggleTheMenu.bind(this));
    }
    
    toggleTheMenu() {
        // Toggle visibility modifier of the menu content.
        this.menuContent.toggleClass("site-header__menu-content--is-visible");
        this.siteHeader.toggleClass("site-header--is-expanded");
    }
}

export default MobileMenu;