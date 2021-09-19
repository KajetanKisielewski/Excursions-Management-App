class Excursions {

    constructor(api) {
        this.apiService = api;
    }

    loadExcursions()  {
        this.apiService.loadData()
            .then( data => this._insertExcursions(data) )
            .catch( err => console.log(err) );
    }

    addExcursions() {
        const form = this._findFormRoot();

        form.addEventListener('submit' , e => {
            e.preventDefault();

            const targetEl = e.target;
            const data = this._createDataToCreateExcursion(targetEl);

            this.apiService.addData(data)
                .catch( err => console.log(err) )
                .finally( () => this.loadExcursions() );
        });
    }

    delateExcursion() {
        const ulEl = this._findListRoot();

        ulEl.addEventListener('click' , e => {
            e.preventDefault();

            const targetEl = e.target;

            if( this._isElementContainsClass(targetEl , 'excursions__field-input--remove') ) {

               const id = this._getIdFromRoot(targetEl);

               this.apiService.delateData(id)
                   .catch( err => console.error(err) )
                   .finally( () => this.loadExcursions() );
            }
        })
    }

    updateExcursions() {
        const ulEl = this._findListRoot()

        ulEl.addEventListener('click' , e => {
            const targetEl = e.target;

            if( this._isElementContainsClass(targetEl , 'excursions__field-input--update') ) {

                if( this._isItemEditable(targetEl) ) {

                    const id = this._getIdFromRoot(targetEl);
                    const data = this._createDataToUpdate(targetEl);

                    this.apiService.updateData(data,id)
                        .catch( err => console.error(err) )
                        .finally( () => {
                            targetEl.value = 'edytuj';
                            this._setItemEditable(targetEl , false);
                        });
                }
                else {
                    targetEl.value = 'zapisz'
                    this._setItemEditable(targetEl , true);
                }
            }
        })
    }

    addExcursionsToOrder() {
        const ulEl = this._findListRoot()

        ulEl.addEventListener('click' , e => {
            e.preventDefault();

            const targetEl = e.target;

            if ( this._isElementContainsClass(targetEl , 'excursions__field-input--submit')) {

                if( this._validateCurrentExcursionData(targetEl) ) {

                    const summaryList = this._findSummaryRoot()

                    const data = this._prepareCurrentExcursionData(targetEl);
                    const summaryItem = this._createSummaryItemData(data)

                    summaryList.appendChild(summaryItem);

                    this._setTotalOrderPrice();
                    this._clearFieldInputs(targetEl);
                }
            }
        })
    }

    delateExcursionFromOrder = () => {

        const summaryList = this._findSummaryRoot();

        summaryList.addEventListener('click' , e => {
            e.preventDefault();

            const targetEl = e.target;

            if( this._isElementContainsClass(targetEl , 'summary__btn-remove') ) {
                targetEl.parentElement.parentElement.remove()
                this._setTotalOrderPrice();
            }
        })
    }

    orderExcursion = () => {

        const orderButton = document.querySelector('.order__field--submit');

        orderButton.addEventListener('click' , (e) => {

            e.preventDefault();

            const targetEl = e.target;

            const data = this._prepareOrderData();

            if( this._validateOrderForm(data) ) {

                this.apiService.updateOrder(data)
                    .catch( err => console.erroe(err) )
                    .finally( () => {
                        this._clearFieldInputs(targetEl),
                        this._clearSummary(),
                        alert('We have accepted your order')
                    })
            }
        })
    }



    _validateOrderForm = (data) => {

        const regName = /^[a-zA-Z]{3,}\s+[a-zA-Z]{2,}$/;
        const regEmail = /^[0-9a-zA-Z_.-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,3}$/;

        if( regName.test(data.name) && regEmail.test(data.email) ) { return true; }
        else{ return alert('Incorrect data'); }
    }

    _prepareOrderData = () => {
            const name = document.querySelector('[name=name]').value;
            const email = document.querySelector('[name=email]').value;
            const excursionDetails = this._createExcursionDetails();

            return { name , email , excursionDetails };
    }

    _createExcursionDetails = () => {

        const excursionsList = this._findSummaryRoot().children
        const excursionDetails = {};

        for(let i=1; i<excursionsList.length; i++) {

            const excursionTitle = excursionsList[i].children[0].children[0].innerText;
            const excursionTotalPrice = excursionsList[i].children[0].children[1].innerText;
            const excursionTotalPriceDetails = excursionsList[i].children[1].innerText;

            excursionDetails[i] = {excursionTitle, excursionTotalPrice, excursionTotalPriceDetails}
        }

        return excursionDetails;
    }

    _clearSummary = () => {

        const summaryItems = document.querySelectorAll('.summary__item:not(.summary__item--prototype)');
        const summaryItemsArray = Array.from(summaryItems);

        summaryItemsArray.forEach( item => {
            item.remove();
        })
    }

    _setTotalOrderPrice = () => {

        const summaryList = this._findSummaryRoot()

        let sum = 0;

        for(let i=1; i<summaryList.children.length; i++) {

            const summaryItemPrice = parseInt(summaryList.children[i].children[0].children[1].innerText);
            sum += summaryItemPrice;
        }

       const totalOrderPrice = document.querySelector('.order__total-price-value');
       totalOrderPrice.innerText = `${sum} PLN`;
    }

    _clearFieldInputs = (targetElement) => {
        const inputs = targetElement.parentElement.parentElement.querySelectorAll('INPUT');
        inputs[0].value = "";
        inputs[1].value = "";
    }

    _createSummaryItemData = (item) => {

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

    _prepareCurrentExcursionData = (targetElement) => {

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

    _validateCurrentExcursionData(targetElement) {
        const adultsQuantity = parseInt(targetElement.parentElement.previousElementSibling.previousElementSibling.children[0].children[1].value);
        const childrenQuantity = parseInt(targetElement.parentElement.previousElementSibling.children[0].children[1].value);

        if( !isNaN(adultsQuantity) && adultsQuantity >= 0 && !isNaN(childrenQuantity) && childrenQuantity >= 0 ) { return true };

        return alert('The value provided must be an integer');
    }

    _findSummaryRoot() {
        return document.querySelector('.panel__summary');
    }

    _createDataToCreateExcursion(targetElement) {
        const [ name , description, adultPrice, childrenPrice ] = targetElement.elements;

        const data = {
            name: name.value,
            description: description.value,
            adultPrice: adultPrice.value,
            childrenPrice: childrenPrice.value
        };

        return data;
    }

    _findFormRoot() {
        return document.querySelector('.form');
    }

    _createDataToUpdate(targetElement) {
        const rootItem = this._findItemRoot(targetElement);
        const name = this._findItemRootTitle(targetElement);
        const description = this._findItemRootDescription(targetElement);
        console.log(description)
        const [adultPrice , childrenPrice] = [...this._findItemStrong(rootItem)];

        return {
            name: name.innerText,
            description: description.innerText,
            adultPrice: adultPrice.innerText,
            childrenPrice: childrenPrice.innerText,
        }
    }

    _findItemRootTitle(targetElement) {
        return this._findItemRoot(targetElement).firstElementChild.firstElementChild;
    }

    _findItemRootDescription(targetElement) {
        return this._findItemRoot(targetElement).firstElementChild.lastElementChild;
    }

    _isItemEditable(targetElement) {
        const rootItem = this._findItemRoot(targetElement);
        const strongList = this._findItemStrong(rootItem);
        const isEditable = [...strongList].every( strong => strong.isContentEditable );

        return isEditable;
    }

    _setItemEditable(targetElement, value) {
        const rootItem = this._findItemRoot(targetElement);
        const strongList = this._findItemStrong(rootItem);

        strongList.forEach( strong => strong.contentEditable = value )
    }

    _findItemStrong(rootItem) {
        return rootItem.querySelectorAll('strong');
    }

    _getIdFromRoot(item) {
        return this._findItemRoot(item).dataset.id;
    }

    _findItemRoot(targetElement) {
        return targetElement.parentElement.parentElement.parentElement;
    }

    _isElementContainsClass(element, className) {
        return element.classList.contains(className);
    }

    _insertExcursions( data ) {
        const ulEl = this._findListRoot()
        this._clearElement(ulEl)

        data.forEach( item => {
            const liEl = this._createLi(item)
            ulEl.appendChild(liEl);
        } )
    }

    _findListRoot() {
        return document.querySelector('.panel__excursions');
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

export default Excursions;