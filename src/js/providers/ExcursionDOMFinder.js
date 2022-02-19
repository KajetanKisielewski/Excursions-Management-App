export default class ExcursionDOMFinder {

    findFormRoot() {
        return document.querySelector('.form');
    }

    findListRoot() {
        return document.querySelector('.panel__excursions');
    }

    findEditabledItems(rootItem) {
        return rootItem.querySelectorAll('strong');
    }

    findItemRootTitle(targetElement) {
        return this.findItemRoot(targetElement).firstElementChild.firstElementChild;
    }

    findItemRootDescription(targetElement) {
        return this.findItemRoot(targetElement).firstElementChild.lastElementChild;
    }

    findItemRoot(targetElement) {
        return targetElement.parentElement.parentElement.parentElement;
    }

    findSummaryRoot() {
        return document.querySelector('.panel__summary');
    }

    findIdFromRoot(item) {
        return this.findItemRoot(item).dataset.id;
    }

    findUserNameInput() {
        return document.querySelector('[name=name]');
    }

    findUserEmailInput() {
        return document.querySelector('[name=email]');
    }

    findCurrentExcursionTitle(targetElement) {
        return targetElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.innerText;
    }

    findCurrentExcursionAdultsPrice(targetElement) {
        return targetElement.parentElement.previousElementSibling.previousElementSibling.children[0].childNodes[1].innerText;
    }

    findCurrentExcursionAdultQuantity(targetElement) {
        return targetElement.parentElement.previousElementSibling.previousElementSibling.children[0].children[1].value;
    }

    findCurrentExcursionChildrenPrice(targetElement) {
        return targetElement.parentElement.previousElementSibling.children[0].childNodes[1].innerText;
    }

    findCurrentExcursionChildrenQuantity(targetElement) {
        return targetElement.parentElement.previousElementSibling.children[0].children[1].value;
    }

    findExcursionItemTitle(excursionItem) {
        return excursionItem.children[0].children[0].innerText
    }

    findExcursionTotalPrice(excursionItem) {
        return excursionItem.children[0].children[1].innerText;
    }

    findExcursionTotalPriceDetails(excursionItem) {
        return excursionItem.children[1].innerText;
    }

    findSummaryItemPrototype() {
        return document.querySelector('.summary__item--prototype');
    }

    findSummaryItemTitle(summaryItem) {
        return summaryItem.children[0].firstElementChild
    }

    findSummaryItemTotalPriceDescritpion(summaryItem) {
        return summaryItem.children[1];
    }

    findSummaryItemTotalPrice(summaryItem) {
        return summaryItem.children[0].firstElementChild.nextElementSibling;;
    }

    findExcursionInputs(targetElement) {
        return targetElement.parentElement.parentElement.querySelectorAll('INPUT');
    }

    findOrderTotalPrice() {
        return document.querySelector('.order__total-price-value')
    }

    findSummaryItems() {
        return document.querySelectorAll('.summary__item:not(.summary__item--prototype)')
    }

    findExcursionItems(element) {
        return element.querySelectorAll('.excursions__item:not(.excursions__item--prototype)');
    }

    findExcursionItemPrototype() {
        return document.querySelector('.excursions__item--prototype');
    }

    findExcursionItemTitle(item) {
        return item.children[0].children[0];
    }

    findExcursionItemDescription(item) {
        return item.children[0].children[1];
    }

    findExcursionItemAdultPrice(item) {
        return item.children[1].firstElementChild.firstElementChild.childNodes[1];
    }

    findExcursionItemChildrenPrice(item) {
        return item.children[1].firstElementChild.nextElementSibling.firstElementChild.childNodes[1];
    }

    findOrderButton() {
        return document.querySelector('.order__field--submit');
    }
}