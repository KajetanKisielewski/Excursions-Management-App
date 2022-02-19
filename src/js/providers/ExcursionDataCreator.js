export default class ExcursionDataProvider {
    constructor(DOMFinder) {
        this.DOMFinder = DOMFinder;
    }

    createOrderData = () => {
        const name = this.DOMFinder.findUserNameInput().value;
        const email = this.DOMFinder.findUserEmailInput().value;
        const excursionDetails = this._createExcursionDetails();

        return { name , email , excursionDetails };
    }

    createCurrentExcursionData = (targetElement) => {

        const currentExcursionTitle = this.DOMFinder.findCurrentExcursionTitle(targetElement);
        const currentExcursionAdultsPrice = this.DOMFinder.findCurrentExcursionAdultsPrice(targetElement)
        const currentExcursionAdultQuantity = this.DOMFinder.findCurrentExcursionAdultQuantity(targetElement)
        const currentExcursionChildrenPrice = this.DOMFinder.findCurrentExcursionChildrenPrice(targetElement)
        const currentExcursionChildrenQuantity = this.DOMFinder.findCurrentExcursionChildrenQuantity(targetElement)

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

    _createExcursionDetails = () => {
        const excursionsList = this.DOMFinder.findSummaryRoot().children
        const excursionDetails = {};

        for(let i=1; i<excursionsList.length; i++) {

            const excursionTitle = this.DOMFinder.findExcursionItemTitle(excursionsList[i])
            const excursionTotalPrice = this.DOMFinder.findExcursionTotalPrice(excursionsList[i]);
            const excursionTotalPriceDetails = this.DOMFinder.findExcursionTotalPriceDetails(excursionsList[i])

            excursionDetails[i] = {excursionTitle, excursionTotalPrice, excursionTotalPriceDetails}
        }

        return excursionDetails;
    }
}