export default class ExcursionDataProvider {
    constructor(DOMFinder) {
        this.DOMFinder = DOMFinder;
    }

    createOrderData = () => {
        const name = document.querySelector('[name=name]').value;
        const email = document.querySelector('[name=email]').value;
        const excursionDetails = this._createExcursionDetails();

        return { name , email , excursionDetails };
    }

    _createExcursionDetails = () => {

        const excursionsList = this.DOMFinder.findSummaryRoot().children
        const excursionDetails = {};

        for(let i=1; i<excursionsList.length; i++) {

            const excursionTitle = excursionsList[i].children[0].children[0].innerText;
            const excursionTotalPrice = excursionsList[i].children[0].children[1].innerText;
            const excursionTotalPriceDetails = excursionsList[i].children[1].innerText;

            excursionDetails[i] = {excursionTitle, excursionTotalPrice, excursionTotalPriceDetails}
        }

        return excursionDetails;
    }

    createCurrentExcursionData = (targetElement) => {

        const currentExcursionTitle = targetElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.innerText;

        const currentExcursionAdultsPrice = targetElement.parentElement.previousElementSibling.previousElementSibling.children[0].childNodes[1].innerText;
        const currentExcursionAdultQuantity = targetElement.parentElement.previousElementSibling.previousElementSibling.children[0].children[1].value;

        const currentExcursionChildrenPrice = targetElement.parentElement.previousElementSibling.children[0].childNodes[1].innerText;
        const currentExcursionChildrenQuantity = targetElement.parentElement.previousElementSibling.children[0].children[1].value;

        const currentExcursionTotalPriceDescription = `Dorośli: ${currentExcursionAdultQuantity} x ${currentExcursionAdultsPrice} PLN , Dzieci: ${currentExcursionChildrenQuantity} x ${currentExcursionChildrenPrice} PLN`;

        const currentExcursionTotalPriceValue = currentExcursionAdultsPrice * currentExcursionAdultQuantity + currentExcursionChildrenPrice * currentExcursionChildrenQuantity;

        return [
            currentExcursionTitle,
            currentExcursionTotalPriceDescription,
            currentExcursionTotalPriceValue
        ]
    }

    createDataToCreateExcursion(targetElement) {
        const [ name , description, adultPrice, childrenPrice ] = targetElement.elements;

        const data = {
            name: name.value,
            description: description.value,
            adultPrice: adultPrice.value,
            childrenPrice: childrenPrice.value
        };

        return data;
    }

    createDataToUpdate(targetElement) {
        const rootItem = this.DOMFinder.findItemRoot(targetElement);
        const name = this.DOMFinder.findItemRootTitle(targetElement);
        const description = this.DOMFinder.findItemRootDescription(targetElement);
        const [adultPrice , childrenPrice] = [...this.DOMFinder.findEditabledItems(rootItem)];

        return {
            name: name.innerText,
            description: description.innerText,
            adultPrice: adultPrice.innerText,
            childrenPrice: childrenPrice.innerText,
        }
    }

}