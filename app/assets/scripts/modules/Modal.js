import $ from 'jquery';

class Modal {
    constructor() { 
        this.openModalButton = $(".open-modal");
        this.modal = $(".modal");
        this.closeModalButton = $(".modal__close");
        this.events();
    }
    
    events() {
        /* Clicking open modal button. */
        this.openModalButton.click(this.openModal.bind(this));
        
        /* Clicking close modal button. */
        this.closeModalButton.click(this.closeModal.bind(this));
        
        /* Pushes any key. */
        $(document).keyup(this.keyPressHandler.bind(this));
    }
    
    keyPressHandler(e) {
        /* Esc key == 27. */
        if (e.keyCode === 27) {
            this.closeModal();
        }
    }
    
    openModal() {
        this.modal.addClass("modal--is-visible");
        /* Prevent default behaviour of clicking button - returning false stops scrolling back up. */
        return false;
    }
    
    closeModal() {
        this.modal.removeClass("modal--is-visible");
        return false;
    }
}

export default Modal;

