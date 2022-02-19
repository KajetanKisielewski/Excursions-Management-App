export default class ExcursionView {
    constructor(DOMFinder) {
        this.DOMFinder = DOMFinder;
    }

    insertExcursions(data) {
        const ulEl = this.DOMFinder.findListRoot()
        this._clearElement(ulEl)

        data.forEach( item => {
            const liEl = this._createLi(item)
            ulEl.appendChild(liEl);
        } )
    }

    createSummaryItem = (data) => {
        const [ name , totalPriceDescription, totalPrice] = data;

        const summaryItem = this.DOMFinder.findSummaryItemPrototype().cloneNode(true);
        summaryItem.classList.remove('summary__item--prototype');

        const summaryTitle = this.DOMFinder.findSummaryItemTitle(summaryItem)
        summaryTitle.innerText = name;

        const summaryTotalPriceDescritpion = this.DOMFinder.findSummaryItemTotalPriceDescritpion(summaryItem)
        summaryTotalPriceDescritpion.innerText = totalPriceDescription;

        const summaryTotalPrice = this.DOMFinder.findSummaryItemTotalPrice(summaryItem)
        summaryTotalPrice.innerText = `${totalPrice} PLN`;

        return summaryItem;
    }

    setTotalOrderPrice = () => {
        const summaryList = this.DOMFinder.findSummaryRoot();

        let sum = 0;
        for(let i=1; i<summaryList.children.length; i++) {
            const summaryItemPrice = parseInt( this.DOMFinder.findSummaryItemTotalPrice(summaryList.children[i]).innerText );
            sum += summaryItemPrice;
        }

       const totalOrderPrice = this.DOMFinder.findOrderTotalPrice();
       totalOrderPrice.innerText = `${sum} PLN`;
    }

    clearFieldInputs = (targetElement) => {
        const [ adultField , childrenField ] = this.DOMFinder.findExcursionInputs(targetElement);
        adultField.value = "";
        childrenField.value = "";
    }

    clearSummary = () => {
        const summaryItems = this.DOMFinder.findSummaryItems();
        const summaryItemsArray = Array.from(summaryItems);

        summaryItemsArray.forEach( item => {
            item.remove();
        })
    }

    setItemEditable(targetElement, value) {
        const rootItem = this.DOMFinder.findItemRoot(targetElement);
        const EditabledItemList = this.DOMFinder.findEditabledItems(rootItem);

        EditabledItemList.forEach( item => item.contentEditable = value )
    }

    _clearElement(element) {
        const childrenOfTheElement = this.DOMFinder.findExcursionItems(element)
        const childrenOfTheElementArray = Array.from(childrenOfTheElement);

        childrenOfTheElementArray.forEach( child => {
            child.remove();
        })
    }

    _createLi(item) {
        const { name, description, adultPrice, childrenPrice } = item;
        const liEl = this.DOMFinder.findExcursionItemPrototype().cloneNode(true);
        liEl.classList.remove('excursions__item--prototype');

        liEl.dataset.id = item.id;
        this.DOMFinder.findExcursionItemTitle(liEl).innerText = name;
        this.DOMFinder.findExcursionItemDescription(liEl).innerText = description;
        this.DOMFinder.findExcursionItemAdultPrice(liEl).textContent = adultPrice;
        this.DOMFinder.findExcursionItemChildrenPrice(liEl).textContent = childrenPrice;

        return liEl;
    }
}