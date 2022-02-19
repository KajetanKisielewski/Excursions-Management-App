import './../css/admin.css';

import API from './API';
import ExcursionDOMFinder from './ExcursionDOMFinder';
import ExcursionValidation from './ExcursionValidation';
import ExcursionView from './ExcursionView';
import ExcursionDataCreator from './ExcursionDataCreator';
import Excursions from './Excursions';

const init = () => {

    const api = new API();
    const DOMFinder = new ExcursionDOMFinder()
    const validation = new ExcursionValidation(DOMFinder)
    const view = new ExcursionView(DOMFinder)
    const dataCreator = new ExcursionDataCreator(DOMFinder)
    const excursions = new Excursions(api, DOMFinder, validation, view, dataCreator);

    excursions.loadExcursions();
    excursions.delateExcursion();
    excursions.updateExcursions();
    excursions.addExcursions();
}

document.addEventListener('DOMContentLoaded' , init);