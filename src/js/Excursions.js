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
                console.log(data);

                // const summaryItem = document.querySelector('.summary__item--prototype').cloneNode(true);
                // summaryItem.classList.remove('summary__item--prototype');

                // const summaryTitle = summaryItem.children[0].firstElementChild;
                // summaryTitle.innerText = title;

                // const summaryTotalPriceDescritpion = summaryItem.children[1];
                // summaryTotalPriceDescritpion.innerText = totalPriceDescription;

                // const summaryTotalPrice = summaryItem.children[0].firstElementChild.nextElementSibling;
                // summaryTotalPrice.innerText = `${totalPriceValue} PLN`;

                // summaryList.appendChild(summaryItem);

                // setTotalOrderPrice();
                // clearFieldInputs(e);
            }
        }
    })
    }

    _prepareCurrentExcursionData = (targetElement) => {

        const currentExcursionTitle = targetElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.innerText;

        const currentExcursionAdultsPrice = targetElement.parentElement.previousElementSibling.previousElementSibling.children[0].childNodes[0].textContent;
        const currentExcursionAdultQuantity = targetElement.parentElement.previousElementSibling.previousElementSibling.children[0].children[0].value;

        const currentExcursionChildrenPrice = targetElement.parentElement.previousElementSibling.children[0].childNodes[0].textContent;
        const currentExcursionChildrenQuantity = targetElement.parentElement.previousElementSibling.children[0].children[0].value;

        const currentExcursionTotalPriceDescription = `${currentExcursionAdultsPrice} ${currentExcursionAdultQuantity} , ${currentExcursionChildrenPrice} ${currentExcursionChildrenQuantity}`;


        const currentExcursionAdultsPriceValue = parseInt( currentExcursionAdultsPrice.split(' ')[1] );
        const currentExcursionChildrenPriceValue = parseInt( currentExcursionChildrenPrice.split(' ')[1] );
        const currentExcursionTotalPriceValue = currentExcursionAdultsPriceValue * parseInt(currentExcursionAdultQuantity) + currentExcursionChildrenPriceValue * parseInt(currentExcursionChildrenQuantity);

        console.log(currentExcursionAdultsPrice)

        return [
            currentExcursionTitle,
            currentExcursionTotalPriceDescription,
            currentExcursionTotalPriceValue
        ]
}

    _validateCurrentExcursionData(targetElement) {
        const adultsQuantity = parseInt(targetElement.parentElement.previousElementSibling.previousElementSibling.children[0].children[0].value);
        const childrenQuantity = parseInt(targetElement.parentElement.previousElementSibling.children[0].children[0].value);

        if( !isNaN(adultsQuantity) && adultsQuantity >= 0 && !isNaN(childrenQuantity) && childrenQuantity >= 0 ) { return true };
        return alert('The value provided must be an integer')
    }

    _findSummaryRoot() {
        return document.querySelector('.panel__summary')
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