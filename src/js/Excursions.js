export default class Excursions {
    constructor(api, DOMFinder, validation, view, dataCreator) {
        this.apiService = api;
        this.DOMFinder = DOMFinder;
        this.validation = validation;
        this.view = view;
        this.dataCreator = dataCreator;
    }

    loadExcursions()  {
        this.apiService.loadData()
            .then( data => this.view.insertExcursions(data) )
            .catch( err => console.log(err) );
    }

    addExcursions() {
        const form = this.DOMFinder.findFormRoot();

        form.addEventListener('submit' , e => {
            e.preventDefault();
            const targetEl = e.target;
            const data = this.dataCreator.createDataToCreateExcursion(targetEl);

            this.apiService.addData(data)
                .catch( err => console.log(err) )
                .finally( () => this.loadExcursions() );
        });
    }

    delateExcursion() {
        const ulEl = this.DOMFinder.findListRoot();

        ulEl.addEventListener('click' , e => {
            e.preventDefault();
            const targetEl = e.target;

            if( this.validation.isElementContainsClass(targetEl , 'excursions__field-input--remove') ) {
                const id = this.DOMFinder.findIdFromRoot(targetEl);

                this.apiService.delateData(id)
                    .catch( err => console.error(err) )
                    .finally( () => this.loadExcursions() );
            }
        })
    }

    updateExcursions() {
        const ulEl = this.DOMFinder.findListRoot();

        ulEl.addEventListener('click' , e => {
            const targetEl = e.target;

            if( this.validation.isElementContainsClass(targetEl , 'excursions__field-input--update') ) {

                if( this.validation.isItemEditable(targetEl) ) {
                    const id = this.DOMFinder.findIdFromRoot(targetEl);
                    const data = this.dataCreator.createDataToUpdate(targetEl);

                    this.apiService.updateData(data,id)
                        .catch( err => console.error(err) )
                        .finally( () => {
                            targetEl.value = 'edytuj';
                            this.view.setItemEditable(targetEl , false);
                        });
                }
                targetEl.value = 'zapisz'
                this.view.setItemEditable(targetEl , true);
            }
        })
    }

    addExcursionsToOrder() {
        const ulEl = this.DOMFinder.findListRoot()

        ulEl.addEventListener('click' , e => {
            e.preventDefault();

            const targetEl = e.target;

            if ( this.validation.isElementContainsClass(targetEl , 'excursions__field-input--submit')) {

                if( this.validation.validateCurrentExcursionData(targetEl) ) {

                    const summaryList = this.DOMFinder.findSummaryRoot();
                    const data = this.dataCreator.createCurrentExcursionData(targetEl);
                    const summaryItem = this.view.createSummaryItem(data)

                    summaryList.appendChild(summaryItem);

                    this.view.setTotalOrderPrice();
                    this.view.clearFieldInputs(targetEl);
                }
            }
        })
    }

    delateExcursionFromOrder = () => {
        const summaryList = this.DOMFinder.findSummaryRoot();

        summaryList.addEventListener('click' , e => {
            e.preventDefault();
            const targetEl = e.target;

            if( this.validation.isElementContainsClass(targetEl , 'summary__btn-remove') ) {
                targetEl.parentElement.parentElement.remove()
                this.view.setTotalOrderPrice();
            }
        })
    }

    orderExcursion = () => {
        const orderButton = this.DOMFinder.findOrderButton();

        orderButton.addEventListener('click' , (e) => {
            e.preventDefault();

            const targetEl = e.target;
            const data = this.dataCreator.createOrderData();

            if( this.validation.validateOrderForm(data) ) {

                this.apiService.addOrder(data)
                    .catch( err => console.error(err) )
                    .finally( () => {
                        this.view.clearFieldInputs(targetEl),
                        this.view.clearSummary(),
                        alert('We have accepted your order')
                    })
            }
        })
    }
}
