import $ from 'jquery';

class MobileMenu {
    constructor() {
        this.menuIcon = $(".site-header__menu-icon");
        this.menuContent = $(".site-header__menu-content");
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
    }
}

export default MobileMenu;