import initCardHeader from '../initCardHeader';
import initDataTable from './initDataTable';
import AjaxService from '../../services/ajaxService';
import addDatatableColumnFilter from '../../services/addDataTableColumnFilters';
import 'datatables.net/js/jquery.dataTables';
import 'datatables.net-buttons/js/dataTables.buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-dt/css/jquery.dataTables.css';
import '../../datatablebutton.css';
import * as constants from '../../constants';

const template = require('../../views/pets/managePets/index.handlebars');

export default class ManagePetMgr {
  constructor(options) {
    this.sideBarMgr = options.sideBarMgr;
    this.initSideBarButtonClick();
    this.addUpdatePetMgr = options.addUpdatePetMgr;
    this.container = $('#managePetsContainer');
    this.table = null;
  }

  init() {
    if (this.table) {
      this.table.destroy();
    }
    this.table = null;
    const t = template({ headerInfo: initCardHeader() });
    this.container.empty().append(t);
    this.getData();
  }

  getData() {
    $('.spinner').show();
    AjaxService.ajaxGet('./api/PetMgrApi')
      .then((pets) => {
        this.table = initDataTable(pets.map(
          (pet) => (
            {
              ...pet,
               petBirthDate: pet.petBirthDate ? new Date(pet.petBirthDate) : null,
            }
          ),
        ));
        addDatatableColumnFilter('petsTable', this.table, [0]);
        this.initSelectClick();
        $('.spinner').hide();
      });
  }

  initSelectClick() {
      $('#petsTable tbody').on('click', 'button', (event) => {
      const data = this.table.row($(event.target).parents('tr')).data();
      this.addUpdatePetMgr.init(data.id);
      this.sideBarMgr.setVisibleContainer('addUpdatePetContainer');
    });
  }


  initSideBarButtonClick() {
    $('.sidebar').on('click', '.spa-btn', () => {
      this.init(0);
    });
  }
}
