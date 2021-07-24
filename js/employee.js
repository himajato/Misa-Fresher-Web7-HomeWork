$(document).ready(function () {
    // load dữ liệu
    loadData();
    getDepartment();
    getPosition();
    $('#btn-cbb-1').on('click', function() {
        var display = $('#combobox-data-1').css('display');
        console.log(display);
        if(display == 'none'){
            $('#combobox-data-1').css('display','block');
        } else{
            $('#combobox-data-1').css('display','none');
        }
    })

    $('#hr-department').on('click', function() {
        var value = $('#hr-department').html();
        $('#department-input').val(value);
        $('#hr-department').addClass('combobox-items-select');
        $('#edu-department').removeClass('combobox-items-select');
        $('#manage-department').removeClass('combobox-items-select');
        $('#combobox-data-1').css('display','none');
    })

    $('#edu-department').on('click', function() {
        var value = $('#edu-department').html();
        $('#department-input').val(value);
        $('#edu-department').addClass('combobox-items-select');
        $('#manage-department').removeClass('combobox-items-select');
        $('#hr-department').removeClass('combobox-items-select');
        $('#combobox-data-1').css('display','none');
    })

    $('#manage-department').on('click', function() {
        var value = $('#manage-department').html();
        $('#department-input').val(value);
        $('#hr-department').removeClass('combobox-items-select');
        $('#manage-department').addClass('combobox-items-select');
        $('#edu-department').removeClass('combobox-items-select');
        $('#combobox-data-1').css('display','none');
    })

    $('#btn-add-employee').on('click', function() {
        $('.modal').css('display','block');
        forCusInput();
        getNewEmpCode();
        requiredInput();
        resetInput();
    })

    $('#btn-close-modal').on('click', function() {
        $('.modal').css('display', 'none');
    })

    $('#btn-cancel').on('click', function() {
        $('.modal').css('display','none');
    })

    $('#btn-cbb-2').on('click', function() {
        var display = $('#combobox-data-2').css('display');
        if(display == 'none'){
            $('#combobox-data-2').css('display', 'block');
        } else {
            $('#combobox-data-2').css('display','none');
        }
    })    

    $('#dev-position').on('click', function() {
        var value = $('#dev-position').html();
        $('#position-input').val(value);
        $('#dev-position').addClass('combobox-items-select');
        $('#it-engineer').removeClass('combobox-items-select');
        $('#web-fresher').removeClass('combobox-items-select');
        $('#combobox-data-2').css('display','none');
    })

    $('#it-engineer').on('click', function() {
        var value = $('#it-engineer').html();
        $('#position-input').val(value);
        $('#it-engineer').addClass('combobox-items-select');
        $('#dev-position').removeClass('combobox-items-select');
        $('#web-fresher').removeClass('combobox-items-select');
        $('#combobox-data-2').css('display','none');
    })

    $('#web-fresher').on('click', function() {
        var value = $('#web-fresher').html();
        $('#position-input').val(value);
        $('#web-fresher').addClass('combobox-items-select');
        $('#it-engineer').removeClass('combobox-items-select');
        $('#dev-position').removeClass('combobox-items-select');
        $('#combobox-data-2').css('display','none');
    })

    $('#btn-combobox-gender').on('click', function() {
        var display = $('#combobox-gender').css('display');
        if(display == 'none'){
            $('#combobox-gender').css('display', 'block');
        } else {
            $('#combobox-gender').css('display','none');
        }
    })

    $('#gender-male').on('click', function() {
        var value = $('#gender-male').html();
        $('#gender-input').val(value);
        $('#combobox-gender').css('display','none');
    })

    $('#gender-female').on('click', function() {
        var value = $('#gender-female').html();
        $('#gender-input').val(value);
        $('#combobox-gender').css('display','none');
    })

    $('#btn-combobox-position').on('click', function() {
        var display = $('#combobox-position').css('display');
        if(display == 'none'){
            $('#combobox-position').css('display', 'block');
        } else {
            $('#combobox-position').css('display','none');
        }
    })

    $('#president-position').on('click',function() {
        var value = $('#president-position').html();
        $('#modal-position-input').val(value);
        $('#combobox-position').css('display','none');
    })

    $('#manager-position').on('click',function() {
        var value = $('#manager-position').html();
        $('#modal-position-input').val(value);
        $('#combobox-position').css('display','none');
    })

    $('#employee-position').on('click',function() {
        var value = $('#employee-position').html();
        $('#modal-position-input').val(value);
        $('#combobox-position').css('display','none');
    })

    $('#btn-combobox-room').on('click', function() {
        var display = $('#combobox-room-data').css('display');
        if(display == 'none'){
            $('#combobox-room-data').css('display', 'block');
        } else {
            $('#combobox-room-data').css('display','none');
        }
    })

    $('#edu-room').on('click',function() {
        var value = $('#edu-room').html();
        $('#department-input-modal').val(value);
        $('#combobox-room-data').css('display','none');
    })

    $('#hr-room').on('click',function() {
        //Lấy dữ liệu từ input
        var value = $('#hr-room').html();
        
        $('#department-input-modal').val(value);
        $('#combobox-room-data').css('display','none');
    })

    $('#manage-room').on('click',function() {
        var value = $('#manage-room').html();
        $('#department-input-modal').val(value);
        $('#combobox-room-data').css('display','none');
    })

    $('#salary-input').on('input', function() {
        var value = $('#salary-input').val();  
        var afterformat = String(value).replaceAll('.', ''); 
        $('#salary-input').val(salaryFormat(afterformat));
    })

    $('#btn-save').on('click', function() {
        var employee = {
          };
          employee.EmployeeCode = $('#code-input').val();
          employee.FullName = $('#name-input').val();
          employee.Salary = $('#salary-input').val().replaceAll('.','');
          employee.DepartmentName = $('#department-input-modal').val();
          employee.Email = $('#email-input').val();
          employee.PhoneNumber = $('#phone-input').val();
          employee.IdentityNumber = $('#identity-input').val();
          employee.DateOfBirth = $('#dob-input').val();
          employee.DepartmentId = '142cb08f-7c31-21fa-8e90-67245e8b283e';
          addNewEmployee(employee);
    })

    $('#btn-refresh').on('click', function(){
        loadData();
    });

})

/**
 * Lấy giữ liệu về
 * created by: NHNGHIA (17/7/2021)
 */

function loadData() {
    $('tbody').empty();
    $.ajax({
        url: 'http://cukcuk.manhnv.net/v1/Employees',
        method: 'GET',
    }).done(function (res) {
        var data = res;
        $.each(data, function(index,item) {
            var ma = item.EmployeeCode;
            var fullName = item.FullName;
            var gender = item.GenderName;
            var dob = item.DateOfBirth;
            var phone = item.PhoneNumber;
            var email = item.Email;
            var position = item.PositionName;
            var department = item.DepartmentName;
            var salary = item.Salary;
            var status = item.WorkStatus;
            var tr = $(`
                <tr>
                    <td>${ma}</td>
                    <td>${fullName}</td>
                    <td>${genderFomat(gender)}</td>
                    <td class="text-align-center">${dobFormat(dob)}</td>
                    <td class="text-align-center">${formatPhone(phone)}</td>
                    <td>${emailFormat(email)}</td>
                    <td>${positionFomat(position)}</td>
                    <td>${departmentFormat(department)}</td>
                    <td class="text-align-right salary">${salaryFormat(salary)}</td>
                    <td>${statusFormat(status)}</td>
                </tr> `);
            $('table tbody').append(tr);
        })
    }). fail(function (res) {
        alert('Có lỗi xảy ra, vui lòng liên hệ Misa')
    })
}

/**-------------------------------------------------
 * Thêm nhân viên mới vào danh sách 
 * @param {data} employee 
 * created by: NHNGHIA (21/72021);
 */
function addNewEmployee(employee) {
    $.ajax({
        url: 'http://cukcuk.manhnv.net/v1/Employees',
        method: 'POST',
        data: JSON.stringify(employee),
        dataType: 'json',
        contentType: 'application/json',
    }).done(function(res) {
        alert('Thêm mới thành công');
        loadData();
    }).fail(function(res) {
        alert('Đã xảy ra lỗi, vui lòng thử lại')
    })
}

/**
 * Lấy mã nhân viên mới nhất bằng cách gọi API rồi tự điền vào ô Mã nhân viên
 * created by: NHNGHIA (21/7/2021)
 */
function getNewEmpCode() {
    $.ajax({
        url: 'http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode',
        method: 'GET',
    }).done( function(res) {
        $('#code-input').val(res);
    }).fail( function() {
        alert('Không thể lấy mã nhân viên mới từ API')
    })
}

/**-------------------------------------------------------------------
 * Forcus vào ô mã nhân viên khi người dùng bấm vào nút thêm nhân viên
 * created by: NHNGHIA (21/7/2021)
 */

function forCusInput() {
    $('#code-input').focus();
}

/**------------------------------------------------
 * Format ngày tháng năm sinh thành dạng dd/mm/yyyy
 * @param {any} dob tham số có kiểu dữ liệu bất kì
 * @returns 
 * created by: NHNGHIA (19/7/2021)
 */

function dobFormat(dob){
    if(dob != null) {
      var date = new Date(dob);
      var day = date.getDate();
      var mon = date.getMonth() + 1;
      var year = date.getFullYear();
      day = day < 10 ? '0' + day : day;
      mon = mon < 10 ? '0' + mon : mon;

      return day + '/' + mon + '/' +year;      
    } else return '';

}


/**-------------------------------------------------------
 * Format số điện thoại, nếu giá trị là null thì trả về ''
 * @param {*} phone 
 * @returns '' nếu phone = null, phone nếu phone !=null;
 * created by: NHNGHIA (19/7/2021)
 */
function formatPhone(phone) {
    if(phone == null){
        return '';
    } else return phone;
}   

/** ---------------------------------------------------
 * Format giới tính, nếu giá trị là null thì trả về ''
 * @param {any} gender tham số có kiểu dữ liệu bất kì
 * @returns 
 * created by: NHNGHIA (19/7/2021)
 */

function genderFomat(gender) {
    if (gender == null)
        return '';
    else return gender;
    
}

/** -------------------------------------------------
 * Format email, nếu giá trị là null thì trả về ''
 * @param {any} email tham số có kiểu dữ liệu bất kì
 * @returns 
 * created by: NHNGHIA (19/7/2021)
 */

function emailFormat(email) {
    if(email == null) {
        return '';
    } else return email
}

/** ---------------------------------------------------
 * Format postion, nếu giá trị là null thì trả về ''
 * @param {any} position tham số là kiểu dữ liệu bất kì
 * @returns 
 * created by: NHNGHIA (19/7/2021)
 */

function positionFomat(position) {
    if(position == null){
        return '';
    } else return position;
}

/**------------------------------------------------------
 * Format department, nếu giá trị là null thì trả về ''
 * @param {any} department tham số là kiểu dữ liệu bất kì
 * @returns 
 * created by: NHNGHIA (19/7/2021)
 */

function departmentFormat(department) {
    if(department == null)
        return '';
    else return department;    
}

/**-------------------------------------------
 * Format salary thành dạng 1.000.000.000
 * @param {number} salary kiểu dữ liệu là một số
 * @returns 
 * created by: NHNGHIA (19/7/2021)
 */

function salaryFormat(salary) {
    var result ='';
    if(salary != null){
        for(var i = String(salary).length; i>0; i = i - 3){
            if(i>3){
                var number = String(salary).slice(i-3,i);
                result += number.split("").reverse().join("") + ".";
            } else {
                var number = String(salary).slice(0,i);
                result += number.split("").reverse().join("");
            }
        }
        return result.split("").reverse().join("");
    } else return '';
}

/**--------------------------------------------------------------
 * Format tình trạng công việc, nếu giá trị là null thì trả về ''
 * @param {any} status tham số là kiểu dữ liệu bất kì
 * @returns 
 * created by: NHNGHIA (19/7/2021)
 */

function statusFormat(status) {
    if(status == null){
        return '';
    } else return status;
}


/**
 * Kiểm tra các trường input đã được nhập chưa, nếu chưa nhập sẽ chuyển
 * boder thành màu đỏ 
 */
function requiredInput(){
    $('input[required]').blur(function() {
        let val = $(this).val();
        if(val == ''){
            $(this).css('border', '1px solid red');
            $(this).attr('title', 'Thông tin này bắt buộc nhập'); 
        } else {
            $(this).css('border', '1px solid #bbbbbb');
            $(this).removeAttr('title');
        }
    })
}
/**
 * Reset các thông tin đã điền trong form thêm nhân viên
 * created by: NHNGHIA
 */
function resetInput() {
    $('.form-info input').val(null);
}


/**
 * Lấy thông tin các phòng ban để append vào combobox
 */
function getDepartment() {
    $.ajax({
        url: 'http://cukcuk.manhnv.net/api/Department',
        method: 'GET',
    }). done(res =>{
        var data = res;
        $.each(data, function(index, item){
            var id = item.DepartmentId;
            var name = item.DepartmentName;
            var code = item.DepartmentCode;
            var data = `
                        <div id="${code}" data-id="${id}" class="combobox-items">${name}</div>
                        `
            $('#combobox-data-1').append(data);
            $('#combobox-room-data').append(data);
        })
    }). fail(res =>{
        alert('Lấy dữ liệu từ Api về thất bại');
    })
}

/**
 */
function getPosition() {
    $.ajax({
        url: 'http://cukcuk.manhnv.net/v1/Positions',
        method: 'GET',
    }). done(res =>{
        var data = res;
        $.each(data, function(index, item){
            var id = item.PositionId;
            var name = item.PositionName;
            var code = item.PositionCode;
            var data = `
                        <div data-id="${id}" class="combobox-items">${name}</div>
                        `
            $('#combobox-data-2').append(data);
            $('#combobox-position').append(data);
        })
    }). fail(res =>{
        alert('Lấy dữ liệu từ Api về thất bại');
    })
}