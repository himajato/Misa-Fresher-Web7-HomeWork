$(document).ready(function () {
    loadData();

    $('#btn-cbb-1').on('click', function() {
        var display = $('.combobox-data').css('display');
        console.log(display);
        if(display == 'none'){
            $('.combobox-data').css('display','block');
        } else{
            $('.combobox-data').css('display','none');
        }
    })

    $('#btn-add-employee').on('click', function() {
        $('.modal').css('display','block');
    })

    $('#btn-close-modal').on('click', function() {
        $('.modal').css('display', 'none');
    })


})

function loadData() {
    $.ajax({
        url: 'http://cukcuk.manhnv.net/v1/Employees',
        method: 'GET',
    }).done(function (res) {
        var data = res;
    }). fail(function (res) {

    })
}
