import '../node_modules/toastr/build/toastr.css';
import './style.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import 'jquery-validation';
import * as Toastr from 'toastr';
import ManagePetsMgr from './pets/managePets/index';
import AddUpdatePetMgr from './pets/addUpdatePet/index';
import SideBarMgr from './sidebar/index';
import getUrlVars from './services/getUrlVars';
import 'dropzone/dist/dropzone.css';

require('jquery-ui-bundle/jquery-ui.css');
require('jquery-ui-bundle');
require('select2');
require('select2/dist/css/select2.css');
require('bootstrap4-toggle');
require('bootstrap4-toggle/css/bootstrap4-toggle.min.css');
window.Dropzone = require('dropzone');

window.Toastr = Toastr;

$(() => {
    $.ajaxSetup({ cache: false });
    const sideBarMgr = new SideBarMgr('pets');
    const addUpdatePetMgr = new AddUpdatePetMgr(sideBarMgr);
    const managePetsMgr = new ManagePetsMgr({ addUpdatePetMgr, sideBarMgr });
    sideBarMgr.init();
    managePetsMgr .init();
    const petId = getUrlVars()['petId'] || 0;
    addUpdatePetMgr.init(parseInt(petId, 10));
    addUpdatePetMgr.addManagePetsMgr(managePets);
    $(document).on('focus', ':input', function () {
        $(this).attr('autocomplete', 'off');
    });

    $("input.select2-input").attr('autocomplete', 'off');

});
