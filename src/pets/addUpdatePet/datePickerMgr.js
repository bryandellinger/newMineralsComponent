/* eslint-disable class-methods-use-this */
export default class datePickerMgr {
  constructor(addUpdatePetMgr) {
    this.addUpdatePetMgr = addUpdatePetMgr;
  }

  init(element, dateFormat) {
    const onSelect = (dateText) => {
      const { Pet } = this.addUpdatePetMgr.state;
      Pet[element] = new Date(dateText);
      this.addUpdatePetMgr.setState(
        { ...this.addUpdatePetMgr.state, Pet },
      );
      this.addUpdatePetMgr.render();
    };

    $(`#${element}`).datepicker({
      dateFormat,
      changeMonth: true,
      changeYear: true,
      onSelect,
      yearRange: '-100:+100',
      beforeShow: (elem, dp) => {
        $(dp.dpDiv).removeClass('hide-day-calender');
      },
    });

    this.initShowButtonClick(element);
    this.initClearButtonClick(element);
    this.initBackSpaceClick(element);

   
    if (this.addUpdatePetMgr.state.Pet[element]) {
      $(`#${element}`).datepicker('setDate', this.addUpdatePetMgr.state.Pet[element]);
    }
  }

  initShowButtonClick(element) {
    $(`#${element}Btn`).click(() => { $(`#${element}`).datepicker('show'); });
  }

  initClearButtonClick(element) {
    $(`#${element}ClearBtn`).click(() => {
      this.clear(element);
    });
  }

  initBackSpaceClick(element) {
    $(`#${element}`).keydown((e) => {
      if (e.keyCode === 8) {
        e.preventDefault();
        this.clear(element);
      }
    });
  }

  clear(element) {
    $(`#${element}`).datepicker('setDate', null);
    const { Pet } = this.addUpdatePetMgr.state;
    Pet[element] = null;
    this.addUpdatePetMgr.setState(
      { ...this.addUpdatePetMgr.state, Pet },
    );
    this.addUpdatePetMgr.render();
  }
}
