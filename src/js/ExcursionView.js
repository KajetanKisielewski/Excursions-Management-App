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

    createSummaryItem = (item) => {
        const summaryItem = document.querySelector('.summary__item--prototype').cloneNode(true);
        summaryItem.classList.remove('summary__item--prototype');

        const summaryTitle = summaryItem.children[0].firstElementChild;
        summaryTitle.innerText = item[0];

        const summaryTotalPriceDescritpion = summaryItem.children[1];
        summaryTotalPriceDescritpion.innerText = item[1];

        const summaryTotalPrice = summaryItem.children[0].firstElementChild.nextElementSibling;
        summaryTotalPrice.innerText = `${item[2]} PLN`;

        return summaryItem;
    }

    setTotalOrderPrice = () => {
        const summaryList = this.DOMFinder.findSummaryRoot();

        let sum = 0;
        for(let i=1; i<summaryList.children.length; i++) {
            const summaryItemPrice = parseInt(summaryList.children[i].children[0].children[1].innerText);
            sum += summaryItemPrice;
        }

       const totalOrderPrice = document.querySelector('.order__total-price-value');
       totalOrderPrice.innerText = `${sum} PLN`;
    }

    clearFieldInputs = (targetElement) => {
        const inputs = targetElement.parentElement.parentElement.querySelectorAll('INPUT');
        inputs[0].value = "";
        inputs[1].value = "";
    }

    clearSummary = () => {

        const summaryItems = document.querySelectorAll('.summary__item:not(.summary__item--prototype)');
        const summaryItemsArray = Array.from(summaryItems);

        summaryItemsArray.forEach( item => {
            item.remove();
        })
    }

    _clearElement(element) {
        const childrenOfTheElement = element.querySelectorAll('.excursions__item:not(.excursions__item--prototype)');
        const childrenOfTheElementArray = Array.from(childrenOfTheElement);

        childrenOfTheElementArray.forEach( child => {
            child.remove();
        })
    }

    _createLi(item) {
        const liEl = document.querySelector('.excursions__item--prototype').cloneNode(true);
        liEl.classList.remove('excursions__item--prototype');

        liEl.dataset.id = item.id;
        liEl.children[0].children[0].innerText = item.name;
        liEl.children[0].children[1].innerText = item.description;

        liEl.children[1].firstElementChild.firstElementChild.childNodes[1].textContent = `${item.adultPrice} `;
        liEl.children[1].firstElementChild.nextElementSibling.firstElementChild.childNodes[1].textContent = `${item.childrenPrice} `;

        return liEl;
    }
}