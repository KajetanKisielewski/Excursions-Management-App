import './../css/client.css';

import ExcursionsAPI from './ExcursionsAPI';


const init = () => {

    loadExcursions();
    orderExcursion();

    addExcursionToSummary();
    delateExcursionFromSummary()
}


const loadExcursions = () => {

    fetch('http://localhost:3000/excursions')
        .then( resp => {
            if(resp.ok) { return resp.json(); }
            return Promise.reject(resp);
        })
        .then( data => insertExcursions(data) )
        .catch( err => console.log(err) )
}


const insertExcursions = ( excursionsList ) => {

    const ulEl = document.querySelector('.panel__excursions');

    excursionsList.forEach( item => {

        const liEl = document.querySelector('.excursions__item--prototype').cloneNode(true);
        liEl.classList.remove('excursions__item--prototype');


        liEl.dataset.id = item.id;
        liEl.children[0].children[0].innerText = item.name;
        liEl.children[0].children[1].innerText = item.description;


        liEl.children[1].firstElementChild.firstElementChild.childNodes[0].textContent = `Dorosły: ${item.adultPrice} PLN x`;
        liEl.children[1].firstElementChild.nextElementSibling.firstElementChild.childNodes[0].textContent = `Dziecko: ${item.childrenPrice} PLN x`;

        ulEl.appendChild(liEl);

    } )
};

const addExcursionToSummary = () => {

    const excursionList = document.querySelector('.panel__excursions');

    excursionList.addEventListener('click' , e => {
        e.preventDefault();

        if ( e.target.classList.contains('excursions__field-input--submit')) {

            if( validateCurrentExcursionData(e) ) {

                const summaryList = document.querySelector('.panel__summary ')

                const [ title , totalPriceDescription, totalPriceValue ]  = prepareCurrentExcursionData(e);

                const summaryItem = document.querySelector('.summary__item--prototype').cloneNode(true);
                summaryItem.classList.remove('summary__item--prototype');

                const summaryTitle = summaryItem.children[0].firstElementChild;
                summaryTitle.innerText = title;

                const summaryTotalPriceDescritpion = summaryItem.children[1];
                summaryTotalPriceDescritpion.innerText = totalPriceDescription;

                const summaryTotalPrice = summaryItem.children[0].firstElementChild.nextElementSibling;
                summaryTotalPrice.innerText = `${totalPriceValue} PLN`;

                summaryList.appendChild(summaryItem);

                setTotalOrderPrice();
                clearFieldInputs(e);
            }
        }
    })
}


const validateCurrentExcursionData = (e) => {

    const adultsQuantity = parseInt(e.target.parentElement.previousElementSibling.previousElementSibling.children[0].children[0].value);
    const childrenQuantity = parseInt(e.target.parentElement.previousElementSibling.children[0].children[0].value);

    if( !isNaN(adultsQuantity) && adultsQuantity >= 0 && !isNaN(childrenQuantity) && childrenQuantity >= 0 ) { return true };
    return alert('The value provided must be an integer')
}

const prepareCurrentExcursionData = (e) => {

    const currentExcursionTitle = e.target.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.innerText;

    const currentExcursionAdultsPrice = e.target.parentElement.previousElementSibling.previousElementSibling.children[0].childNodes[0].textContent;
    const currentExcursionAdultQuantity = e.target.parentElement.previousElementSibling.previousElementSibling.children[0].children[0].value;

    const currentExcursionChildrenPrice = e.target.parentElement.previousElementSibling.children[0].childNodes[0].textContent;
    const currentExcursionChildrenQuantity = e.target.parentElement.previousElementSibling.children[0].children[0].value;

    const currentExcursionTotalPriceDescription = `${currentExcursionAdultsPrice} ${currentExcursionAdultQuantity} , ${currentExcursionChildrenPrice} ${currentExcursionChildrenQuantity}`;


    const currentExcursionAdultsPriceValue = parseInt( currentExcursionAdultsPrice.split(' ')[1] );
    const currentExcursionChildrenPriceValue = parseInt( currentExcursionChildrenPrice.split(' ')[1] );
    const currentExcursionTotalPriceValue = currentExcursionAdultsPriceValue * parseInt(currentExcursionAdultQuantity) + currentExcursionChildrenPriceValue * parseInt(currentExcursionChildrenQuantity);

    return [
        currentExcursionTitle,
        currentExcursionTotalPriceDescription,
        currentExcursionTotalPriceValue
    ]
}


const delateExcursionFromSummary = () => {

    const summaryList = document.querySelector('.panel__summary');

    summaryList.addEventListener('click' , e => {
        e.preventDefault();

        if( e.target.classList.contains('summary__btn-remove') ) {
            e.target.parentElement.parentElement.remove()
            setTotalOrderPrice();
        }
    })
}

const setTotalOrderPrice = () => {

    const summaryList = document.querySelector('.panel__summary');

    let sum = 0;

    for(let i=1; i<summaryList.children.length; i++) {

        const summaryItemPrice = parseInt(summaryList.children[i].children[0].children[1].innerText);
        sum += summaryItemPrice;
    }

   const totalOrderPrice = document.querySelector('.order__total-price-value');
   totalOrderPrice.innerText = `${sum} PLN`;
}

const orderExcursion = () => {

    const orderButton = document.querySelector('.order__field--submit');

    orderButton.addEventListener('click' , (e) => {

        e.preventDefault();

        const name = document.querySelector('[name=name]').value;
        const email = document.querySelector('[name=email]').value;
        const excursionDetails = createExcursionDetails();

       if( validateOrderForm(name, email) ) {

        const data = {
            name,
            email,
            excursionDetails
        };

        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        };

        fetch('http://localhost:3000/orders' , options)
            .then( resp => console.log(resp) )
            .catch( err => console.erroe(err) )
            .finally( () => {
                clearFieldInputs(e),
                clearSummary(),
                alert('We have accepted your order')
             })
       }
    })
}

const validateOrderForm = (name, email) => {

    const regName = /^[a-zA-Z]{3,}\s+[a-zA-Z]{2,}$/;
    const regEmail = /^[0-9a-zA-Z_.-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,3}$/;

    if( regName.test(name) && regEmail.test(email) ) { return true }
}

const createExcursionDetails = () => {

    const excursionsList = document.querySelector('.panel__summary').children
    const excursionDetails = {};

    for(let i=1; i<excursionsList.length; i++) {

        const excursionTitle = excursionsList[i].children[0].children[0].innerText;
        const excursionTotalPrice = excursionsList[i].children[0].children[1].innerText;
        const excursionTotalPriceDetails = excursionsList[i].children[1].innerText;

        excursionDetails[i] = {excursionTitle, excursionTotalPrice, excursionTotalPriceDetails}
    }

    return excursionDetails;
}

const clearSummary = () => {

    const summaryItems = document.querySelectorAll('.summary__item:not(.summary__item--prototype)');
    const summaryItemsArray = Array.from(summaryItems);

    summaryItemsArray.forEach( item => {
        item.remove();
    })
}

const clearFieldInputs = (e) => {
    const inputs = e.target.parentElement.parentElement.querySelectorAll('INPUT');
    inputs[0].value = "";
    inputs[1].value = "";
}




document.addEventListener('DOMContentLoaded' , init)