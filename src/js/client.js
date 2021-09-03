import './../css/client.css';

import ExcursionsAPI from './ExcursionsAPI';


const init = () => {
    console.log('client');

    loadExcursions();
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

        ulEl.appendChild(liEl);

        liEl.children[0].children[0].innerText = item.name;
        liEl.children[0].children[1].innerText = item.description;

        liEl.children[1].firstElementChild.firstElementChild.innerText = `Dorosły: ${item.adultPrice} X PLN`;
        liEl.children[1].firstElementChild.nextElementSibling.firstElementChild.innerText = `Dorosły: ${item.childrenPrice} X PLN`;

        ulEl.appendChild(liEl);
    } )
}






document.addEventListener('DOMContentLoaded' , init)