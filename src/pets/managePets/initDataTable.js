/* eslint-disable no-shadow */
export default function initDataTable(data) {
    const table = $('#petsTable').DataTable(
    {
      data,
      dom: 'lBfrtip',
      orderCellsTop: true,
      fixedHeader: true,
      buttons: [ 'copyHtml5', 'excelHtml5', 'csvHtml5', 'pdfHtml5', ],
      searching: true,
      columnDefs: [
        {
          targets: [0], defaultContent: '<button>select</button>', searchable: false,  orderable: false,
        },
      ],
      columns: [
        { data: 'id', name: 'id', autoWidth: true, render: '<button>select</button>', },
        { data: 'petName', name: 'petName', autoWidth: true },
        { data: 'petTypeName', name: 'petTypeName', autoWidth: true },
          {
              data: 'petBirthdate',
              name: 'petBirthdate',
              type: 'date',
              autoWidth: true,
              render(data) {
                  if (data) {
                      const d = new Date(data);
                      return d.toLocaleDateString().replace(/\u200E/g, '');
                  }
                  return '';
              },
          },
        {
          data: 'petPrice',
          name: 'petPrice',
          autoWidth: true,
          render: $.fn.dataTable.render.number(',', '.', 2),
        },
      ],
    },
  );
  return table;
}
