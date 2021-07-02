/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable no-undef */
import initState from './initState';
import initCardHeader from '../initCardHeader';
import formatReadOnlyNumberInputs from '../../services/formatReadOnlyNumberInputs';
import AjaxService from '../../services/ajaxService';
import elementsToBeValidated from './elementsToBeValidated';
import DatePickerMgr from './datePickerMgr';

const template = require('../../views/pets/addUpdatePet/index.handlebars');

export default class AddUpdatePetMgr {
  constructor(sideBarMgr) {
    this.container = $('#addUpdatePetContainer');
    this.sideBarMgr = sideBarMgr;
    this.initSideBarButtonClick();
    this.initScrollToBottom();
    this.initScrollToTop();
    this.id = 0;
    this.datePickerMgr = null;
    this.managePetsMgr = null;
  }

  setState(state) {
    this.state = state;
  }

  init(id) {
    this.id = id || 0;
    this.state = initState();
    this.setState({ ...this.state, editmode: !id });
    this.initEditBtnClick();
    this.initCancelChangesClick();
    this.initAddNewPetBtnClick();
    this.initMgrs();
    this.getData(id);
  }

  initMgrs() {
    this.datePickerMgr = new DatePickerMgr(this);
  }

  addManagePetsMgr(managePetsMgr) {
    this.managePetsMgr = managePetsMgr;
  }

  getData(id) {
    $('.spinner').show();
    $.when(
        $.get(`./api/PetsMgrApi/${id}`, (pet) => {
        if (pet && pet.id) {
          this.setState({
            ...this.state,
            pet: {
              ...pet,
              petBirthdate: pet.petBirthdate
                  ? new Date(pet.petBirthdate) : null,
            },
          });
        }
      }),

        $.get('./api/PetsMgrApi/GetPetTypes', (petTypes) => {
          this.setState({ ...this.state, petTypes });
      }),

    ).then(() => {
      this.render();
      $('.spinner').hide();
    });
  }

  doesElementHaveError(element) {
    const { submitInd } = this.state;
    const { showOnlyIfFormSubmitted } = elementsToBeValidated.find((x) => x.element === element);
    if (!$(`#${element}`).length) {
      return false;
    }
    $(`#${element}Error`).hide();
    $(`#${element}`).removeClass('is-invalid');
    if ($(`#${element}`).data('select2')) {
      $($(`#${element}`).data('select2').$container).removeClass('is-invalid');
    }

    if (showOnlyIfFormSubmitted && !submitInd) {
      return false;
    }

    if (!$(`#${element}`)[0].checkValidity()) {
      $(`#${element}`).addClass('is-invalid');
      if ($(`#${element}`).data('select2')) {
        $($(`#${element}`).data('select2').$container).addClass('is-invalid');
      }
      $(`#${element}Error`).show();
      return true;
    }
    return false;
  }

  initPetInputChange() {
    $('.petInput').change((e) => {
      const { pet } = this.state;
      const element = $(e.target).attr('name');
      pet[element] = $(e.target).val();
      this.setState({
        ...this.state,
        pet: {
          ...pet,
            petPrice: parseFloat(pet.petPrice || 0),
            petTypeId: parseInt(pet.petTypeId,10),
        },
      });
      if (elementsToBeValidated.find((x) => x.element === element)) {
        this.doesElementHaveError(element);
      }
    });
  }


  initSideBarButtonClick() {
    $('.sidebar').on('click', '.spa-btn', () => {
      this.init(0);
    });
  }

  render() {
    const {
      editmode, pet, petTypes,
    } = this.state;
    const handlebarData = {
      headerInfo: initCardHeader(),
      petTypes: petTypes.map(
            (petType) => (
                {
                    ...petType,
                    selected: petType.id === pet.petTypeId,
                }
            ),
        ),
      editmode,
      pet,
    };
    const t = template(handlebarData);
    this.container.empty().append(t);
      this.datePickerMgr.init('petBirthdate', 'mm/dd/yy');
      $('#petTypeId').select2({ placeholder: 'Select a Pet Type', width: '100%' });
    this.initPetInputChange();
    this.initFormSubmit();
    formatReadOnlyNumberInputs('addUpdatePetContainer');
  }


  initScrollToBottom() {
    this.container.on('click', '.scrollToBottomBtn', () => {
      $('html, body').animate({ scrollTop: $(document).height() }, 'slow');
    });
  }

  initScrollToTop() {
    this.container.on('click', '.scrollToTopBtn', () => {
      $('html, body').animate({ scrollTop: 0 }, 'slow');
    });
  }

  initAddNewPetBtnClick() {
    this.container.on('click', '.addNewPetBtn', () => {
      this.init(0);
    });
  }

  initEditBtnClick() {
    this.container.on('click', '.editPetBtn', () => {
      this.setState({ ...this.state, editmode: true });
      this.render();
    });
  }

  initCancelChangesClick() {
    this.container.on('click', '#cancelPetChangesBtn', () => {
      this.init(this.id, this.checkId);
    });
  }


  initFormSubmit() {
    // eslint-disable-next-line consistent-return
    $('#addUpdatePetForm').submit(() => {
      const {
        pet,
      } = this.state;

      this.setState({ ...this.state, submitInd: true });
      let formHasError = false;


      // eslint-disable-next-line no-restricted-syntax
      for (const item of elementsToBeValidated) {
        if (this.doesElementHaveError(item.element)) {
          formHasError = true;
        }
      }

      if (formHasError) {
        window.Toastr.error('Please fix errors and resubmit');
        return false;
      }

      const newPet = {
        ...pet,
        petPrice: pet.petPrice ? parseFloat(pet.petPrice) : null,
      };

      $('.petSubmitbtn').hide();
      $('.petSubmitBtnDisabled').show();
      AjaxService.ajaxPost('./api/PetsMgrApi', newPet)
        .then((d) => {
          window.Toastr.success('Your Pet has been saved', 'Save Successful', { positionClass: 'toast-top-center' });
          this.managePetsMgr.init();
          this.init(d.id);
        })
        .catch(() => {
          $('.petSubmitbtn').show();
          $('.petSubmitBtnDisabled').hide();
        });
    });
  }
}
