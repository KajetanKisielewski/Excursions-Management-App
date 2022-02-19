export default class ExcursionValidation {
    constructor(DOMFinder) {
        this.DOMFinder = DOMFinder;
    }

    validateOrderForm = (data) => {
        const regName = /^[a-zA-Z]{3,}\s+[a-zA-Z]{2,}$/;
        const regEmail = /^[0-9a-zA-Z_.-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,3}$/;

        if( regName.test(data.name) && regEmail.test(data.email) ) { return true; }
        return alert('Incorrect data');
    }

    validateCurrentExcursionData(targetElement) {
        const adultsQuantity = parseInt( this.DOMFinder.findCurrentExcursionAdultQuantity(targetElement) );
        const childrenQuantity = parseInt( this.DOMFinder.findCurrentExcursionChildrenQuantity(targetElement));

        if( !isNaN(adultsQuantity) && adultsQuantity >= 0 && !isNaN(childrenQuantity) && childrenQuantity >= 0 ) { return true };
        return alert('The value provided must be an integer');
    }

    isItemEditable(targetElement) {
        const rootItem = this.DOMFinder.findItemRoot(targetElement);
        const EditabledItemList = this.DOMFinder.findEditabledItems(rootItem);
        const isEditable = [...EditabledItemList].every( item => item.isContentEditable );

        return isEditable;
    }

    isElementContainsClass(element, className) {
        return element.classList.contains(className);
    }


}