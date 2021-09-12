import './../css/admin.css';

import ExcursionsAPI from './ExcursionsAPI';

const api = new ExcursionsAPI();

const init = () => {

    loadExcursions();
    addExcursions();
    delateExcursion();
    updateExcursions();
}

const loadExcursions = () => {

    api.loadData()
        .then( data => insertExcursions(data) )
        .catch( err => console.log(err) )
}

const insertExcursions = ( excursionsList ) => {

    clearExcursionsList();

    const ulEl = document.querySelector('.panel__excursions');

    excursionsList.forEach( item => {

        const liEl = document.querySelector('.excursions__item--prototype').cloneNode(true);
        liEl.classList.remove('excursions__item--prototype');

        liEl.dataset.id = item.id;
        liEl.children[0].children[0].innerText = item.name;
        liEl.children[0].children[1].innerText = item.description;


        liEl.children[1].firstElementChild.firstElementChild.childNodes[1].textContent = `${item.adultPrice} `;
        liEl.children[1].firstElementChild.nextElementSibling.firstElementChild.childNodes[1].textContent = `${item.childrenPrice} `;

        ulEl.appendChild(liEl);
    } )
};

const addExcursions = () => {

    const form = document.querySelector('.form');

    form.addEventListener('submit' , e => {
        e.preventDefault();

        const [ name , description, adultPrice, childrenPrice ] = e.target.elements;

        const data = {
            name: name.value,
            description: description.value,
            adultPrice: adultPrice.value,
            childrenPrice: childrenPrice.value
        };

        api.addData(data)
            .catch( err => console.log(err) )
            .finally( loadExcursions );
    });
}


const delateExcursion = () => {

    const ulEl = document.querySelector('.panel__excursions')

    ulEl.addEventListener('click' , e => {
        e.preventDefault();

        const targetEl = e.target

        if( targetEl.classList.contains('excursions__field-input--remove') ) {

           const excursionItem = targetEl.parentElement.parentElement.parentElement;
           const excursionItemId = excursionItem.dataset.id;


           api.delateData(excursionItemId)
               .catch( err => console.error(err) )
               .finally( loadExcursions )
        }
    })
}

const updateExcursions = () => {

    const excursionList = document.querySelector('.panel__excursions ');

    excursionList.addEventListener('click' , e => {

        const targetEl = e.target;

        if( targetEl.classList.contains('excursions__field-input--update') ) {

            const excursionItem = targetEl.parentElement.parentElement.parentElement;

            const strongList = excursionItem.querySelectorAll('strong');

            const isEditable = [...strongList].every( strong => strong.isContentEditable );

            if(isEditable) {
                const id = excursionItem.dataset.id;
                const name = targetEl.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.innerText;
                const description =targetEl.parentElement.parentElement.parentElement.firstElementChild.lastElementChild.innerText;

                const data = {
                    name,
                    description,
                    adultPrice: strongList[0].innerText,
                    childrenPrice: strongList[1].innerText
                };


                api.updateData(data, id)
                    .catch( err => console.error(err) )
                    .finally( () => {
                        targetEl.value = 'edytuj';
                        strongList.forEach( strong => strong.contentEditable = false)
                    })
            }
            else {

                targetEl.value = 'zapisz'
                strongList.forEach( strong => strong.contentEditable = true)
            }
        }
    })
}

const clearExcursionsList = () => {

    const excursionItems = document.querySelectorAll('.excursions__item:not(.excursions__item--prototype)');
    const excursionItemsArray = Array.from(excursionItems);

    excursionItemsArray.forEach( item => {
        item.remove();
    })
}





document.addEventListener('DOMContentLoaded' , init)