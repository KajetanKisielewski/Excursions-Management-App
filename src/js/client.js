import './../css/client.css';

import API from './providers/API';
import ExcursionDOMFinder from './providers/ExcursionDOMFinder';
import ExcursionValidation from './providers/ExcursionValidation';
import ExcursionView from './providers/ExcursionView';
import ExcursionDataCreator from './providers/ExcursionDataCreator';
import Excursions from './Excursions';

const init = () => {

    const api = new API();
    const DOMFinder = new ExcursionDOMFinder()
    const validation = new ExcursionValidation(DOMFinder)
    const view = new ExcursionView(DOMFinder)
    const dataCreator = new ExcursionDataCreator(DOMFinder)
    const excursions = new Excursions(api, DOMFinder, validation, view, dataCreator);

    excursions.loadExcursions();
    excursions.addExcursionsToOrder();
    excursions.delateExcursionFromOrder();
    excursions.orderExcursion();
}

document.addEventListener('DOMContentLoaded' , init)