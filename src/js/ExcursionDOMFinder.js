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
}