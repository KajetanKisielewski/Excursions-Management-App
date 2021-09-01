import './../css/admin.css';

import ExcursionsAPI from './ExcursionsAPI';


const init = () => {
    console.log('admin');
    addExcursions();
    delateExcursion();
}

const addExcursions = () => {

    const form = document.querySelector('.form');

    form.addEventListener('submit' , e => {
        e.preventDefault();

        console.log(e.currentTarget.elements)

        const [ name , description, adultPrice, childrenPrice ] = e.target.elements;

        const data = {
            name: name.value,
            description: description.value,
            adultPrice: adultPrice.value,
            childrenPrice: childrenPrice.value
        };

        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        };

        fetch('http://localhost:3000/excursions' , options)
            // .then( resp => console.log(resp) )
            // .catch( err => console.log(err) );
    });
}



document.addEventListener('DOMContentLoaded' , init)