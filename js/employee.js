$(document).ready(function () {
    new Employee();
})

class Employee extends Common {
    FormMode = null;
    EmpoloyeeId = null;
    constructor() {
        super();
        this.loadData();
        this.eventInit();
        this.getDepartmentToCombobox();
        this.getPositionToCombobox();
    }
    
    /**
     * Lấy dữ liệu về đổ vào bảng
     * created by: NHNGHIA (17/7/2021)
     */
    loadData() {
        var self = this;
        try {
            $('tbody').empty();
            $.ajax({
                url: `${ConfigApi.urlv1}Employees`,
                method: 'GET',
            }).done(function (res) {
                var data = res;
                $.each(data, function (index, item) {
                    var id = item.EmployeeId;
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
                                <tr id="${id}">
                                    <td><input type="checkbox" /></td>
                                    <td>${ma}</td>
                                    <td>${fullName}</td>
                                    <td>${self.genderFomat(gender)}</td>
                                    <td class="text-align-center">${self.dobFormat(dob)}</td>
                                    <td class="text-align-center">${self.formatPhone(phone)}</td>
                                    <td>${self.emailFormat(email)}</td>
                                    <td>${self.positionFomat(position)}</td>
                                    <td>${self.departmentFormat(department)}</td>
                                    <td class="text-align-right salary">${self.salaryFormat(salary)}</td>
                                    <td>${self.statusFormat(status)}</td>
                                </tr> `);
                    $('.table-list tbody').append(tr);
                })
            }).fail(function (res) {
                switch (res.status) {
                    case 500:
                        alert('Có lỗi từ server, vui lòng thử lại');
                        break;
                    case 400:
                        alert('Dữ liệu không hợp lệ');
                        break;
                    default:
                        break;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }


    /**
     * Khởi tạo dữ liệu
     * created by: NHNGHIA (17/7/2021)
     */
    eventInit() {
        var self = this;

        Combobox.displayCombobox('combobox-1','combobox-data-1','icon-dropdown-department');
        $('#btn-add-employee').on('click', function () {
            self.formMode = 1;
            self.resetBorder();
            self.resetItemSelect('combobox-room-data');
            self.resetItemSelect('combobox-position');
            self.resetInputValueOfClass('input-left');
            self.resetInputValueOfClass('input-right');
            self.openADivById('modal-info')
            self.forCusInput();
            self.getNewEmpCode();
            self.requiredInput();
            self.resetInput();
        })

        $('#btn-close-modal').on('click', function () {
            self.closeADivById('modal-info');
        })

        $('#btn-cancel').on('click', function () {
            self.closeADivById('modal-info')
        })

        Combobox.displayCombobox('combobox-2','combobox-data-2','icon-dropdown-position');
       
        Combobox.displayCombobox('cbb-gender','combobox-gender','icon-dropdown-gender');
    
        Combobox.genderItemSelect('gender-male');

        Combobox.genderItemSelect('gender-female');

        Combobox.genderItemSelect('gender-undefine');

        Combobox.displayCombobox('cbb-position','combobox-position','icon-position');

        Combobox.displayCombobox('cbb-room','combobox-room-data','icon-department')

        $('#salary-input').on('input', function () {
            var value = $('#salary-input').val();
            var afterformat = String(value).replaceAll('.', '');
            $('#salary-input').val(self.salaryFormat(afterformat));
        })


        $('#btn-refresh').on('click', function () {
            sefl.loadData();
        });

        $('table').on('dblclick', 'tbody tr', function () {
            self.formMode = 0;
            self.resetBorder();
            self.resetItemSelect('combobox-room-data');
            self.resetItemSelect('combobox-position');
            $('.modal').css('display', 'block');
            self.EmployeeId = $(this).attr('id');
            self.getEmployeeByIdToForm(self.EmployeeId);

        })

        $('#btn-save').on('click', function () {
            if(self.checkInputRequire() == 1){
                if (self.formMode == 1) {
                    self.addNewEmployee();
                    $('.modal').css('display', 'none');
                } else {
                    self.updateEmployee(self.EmployeeId);
                    $('.modal').css('display', 'none');
                }
            }
        })

    }

    /**
     * 
     * @param {object} employee 
     */
    addNewEmployee(employee) {
        var self = this;
        var employee = {
        };
        employee.EmployeeCode = $('#code-input').val();
        employee.FullName = $('#name-input').val();
        employee.Gender = $('#gender-input').attr('gender-id');
        employee.Salary = $('#salary-input').val().replaceAll('.', '');
        employee.Email = $('#email-input').val();
        employee.PhoneNumber = $('#phone-input').val();
        employee.IdentityNumber = $('#identity-input').val();
        employee.DateOfBirth = $('#dob-input').val();
        employee.DepartmentId = $('#department-input-modal').attr('data-id');
        employee.PositionId = $('#modal-position-input').attr('position-id');
        try {
            $.ajax({
                url: `${ConfigApi.urlv1}Employees`,
                method: 'POST',
                data: JSON.stringify(employee),
                dataType: 'json',
                contentType: 'application/json',
            }).done(function (res) {
                alert('Thêm mới thành công');
                self.loadData();
            }).fail(function (res) {
                switch (res.status) {
                    case 500:
                        alert('Có lỗi từ server, vui lòng thử lại');
                        break;
                    case 400:
                        alert('Dữ liệu không hợp lệ');
                        break;
                    default:
                        break;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**-----------------------------------------------
     * Sửa thông tin của một nhân viên đã có
      * @param {id} id Tham số là id của một nhân viên
      * created by: NHNGHIA (21/7/2021)
     */
    updateEmployee(id) {
        var self = this;
        var employee = {
        };
        employee.EmployeeCode = $('#code-input').val();
        employee.Gender = $('#gender-input').attr('gender-id');
        employee.FullName = $('#name-input').val();
        employee.Salary = $('#salary-input').val().replaceAll('.', '');
        employee.PositionId = $('#modal-position-input').attr('data-id');
        employee.DepartmentId = $('#department-input-modal').attr('data-id');
        employee.Email = $('#email-input').val();
        employee.PhoneNumber = $('#phone-input').val();
        employee.IdentityNumber = $('#identity-input').val();
        employee.DateOfBirth = $('#dob-input').val();
        try {
            $.ajax({
                url: `${ConfigApi.urlv1}Employees/${id}`,
                method: 'PUT',
                data: JSON.stringify(employee),
                dataType: 'json',
                contentType: 'application/json'
            }).done(function (res) {
                alert('Sửa thông tin nhân viên thành công')
                self.loadData();
            }).fail(function (res) {
                switch (res.status) {
                    case 500:
                        alert('Có lỗi từ server, vui lòng thử lại');
                        break;
                    case 400:
                        alert('Dữ liệu không hợp lệ');
                        break;
                    default:
                        break;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }


    /**
    * Lấy mã nhân viên mới nhất bằng cách gọi API rồi tự điền vào ô Mã nhân viên
     * created by: NHNGHIA (21/7/2021)
    */
    getNewEmpCode() {
        try {
            $.ajax({
                url: `${ConfigApi.urlv1}Employees/NewEmployeeCode`,
                method: 'GET',
            }).done(function (res) {
                $('#code-input').val(res);
            }).fail(function (res) {
                switch (res.status) {
                    case 500:
                        alert('Có lỗi từ server, vui lòng thử lại');
                        break;
                    case 400:
                        alert('Dữ liệu không hợp lệ');
                        break;
                    default:
                        break;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
    * Lấy thông tin các phòng ban để append vào combobox
    * created by: NHNGHIA (21/7/2021)
    */
    getDepartmentToCombobox() {
        try {
            $.ajax({
                url: `${ConfigApi.urlapi}Department`,
                method: 'GET',
                async: false
            }).done(function (res) {
                var data = res;
                $.each(data, function (index, item) {
                    var id = item.DepartmentId;
                    var name = item.DepartmentName;
                    var code = item.DepartmentCode;
                    var data = `
                                <div id="${code}" data-id="${id}" class="combobox-items">
                                    <i class="fas fa-check" style="visibility: hidden; size: 16px"></i>
                                    <div style="margin-left: 10px">${name}</div>
                                </div>
                                `
                    var data2 = `
                                <div id="${id}"  data-id="" class="combobox-items">
                                    <i class="fas fa-check" style="visibility: hidden; size: 16px"></i>
                                    <div style="margin-left: 10px">${name}</div>
                                </div>
                                `
                    $('#combobox-data-1').append(data);
                    $('#combobox-room-data').append(data2);
                })
                $.each(data, function (index, item) {
                    var code = item.DepartmentCode;
                    var name = item.DepartmentName;
                    Combobox.itemSelectCombobox(code, 'department-input-1', name, 'combobox-data-1', 'icon-dropdown-department');
                })
                $.each(data, function (index, item) {
                    var id = item.DepartmentId;
                    var name = item.DepartmentName;
                    Combobox.itemSelectCombobox(id, 'department-input-modal', name, 'combobox-room-data', 'icon-department');    
                })
            }).fail(function (res) {
                switch (res.status) {
                    case 500:
                        alert('Có lỗi từ server, vui lòng thử lại');
                        break;
                    case 400:
                        alert('Dữ liệu không hợp lệ');
                        break;
                    default:
                        break;
                }
            })
        }
        catch (error) {
            console.log(error);
        }

    }

    /**
    * Lấy dữ liệu các vị trí đổ vào combobox
    * created by: NHNGHIA (19/7/2021)
    */
    getPositionToCombobox() {
        try {
            $.ajax({
                url: `${ConfigApi.urlv1}Positions`,
                method: 'GET',
                async: false
            }).done(res => {
                var data = res;
                $.each(data, function (index, item) {
                    var id = item.PositionId;
                    var name = item.PositionName;
                    var code = item.PositionCode;
                    var data = `
                                <div id="${code}" data-id="${id}" class="combobox-items">
                                    <i class="fas fa-check" style="visibility: hidden; size: 16px"></i>
                                    <div style="margin-left: 10px">${name}</div>
                                </div>
                                `
                    var data2 = `
                                <div id="${id}" data-id="" class="combobox-items">
                                    <i class="fas fa-check" style="visibility: hidden; size: 16px"></i>
                                    <div style="margin-left: 10px">${name}</div>
                                </div>
                                `
                    $('#combobox-data-2').append(data);
                    $('#combobox-position').append(data2);
                })
                $.each(data, function (index, item) {
                    var code = item.PositionCode;
                    var name = item.PositionName;
                    Combobox.itemSelectCombobox(code, 'position-input', name, 'combobox-data-2', 'icon-dropdown-position');
                })
                $.each(data, function (index, item) {
                    var id = item.PositionId;
                    var name = item.PositionName;
                    Combobox.itemSelectCombobox(id, 'modal-position-input', name, 'combobox-position', 'icon-position');
                })
            }).fail(res => {
                switch (res.status) {
                    case 500:
                        alert('Có lỗi từ server, vui lòng thử lại');
                        break;
                    case 400:
                        alert('Dữ liệu không hợp lệ');
                        break;
                    default:
                        break;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**------------------------------------------------
     * Lấy dữ liệu ở một hàng đổ vào form sửa nhân viên
     * @param {id} id tham số là id của một nhân viên 
     */
    getEmployeeByIdToForm(id) {
        var self = this;
        $.ajax({
            url: `${ConfigApi.urlv1}Employees/${id}`,
            method: 'GET',
            async: false
        }).done(function (res) {
            var promiseDepartment = Base.getDepartmentNameById(res.DepartmentId);
            var promisePosition = Base.getPositionById(res.PositionId);
            console.log(promisePosition);
            promiseDepartment.then(function(result){
                $('#department-input-modal').val(result);
            })
            promisePosition.then(function(result){
                $('#modal-position-input').val(result);
                console.log(result);
            })
            $('#code-input').val(res.EmployeeCode);
            $('#name-input').val(res.FullName);
            $('#dob-input').val(self.dobFormatToForm(res.DateOfBirth));
            $('#email-input').val(res.Email);
            $('#phone-input').val(res.PhoneNumber);
            $('#salary-input').val(self.salaryFormat(res.Salary));
            $('#identity-input').val(res.IdentityNumber);
            $('#identity-date-input').val(self.dobFormatToForm(res.IdentityDate));
            $('#identity-place-input').val(res.IdentityPlace);
            $('#department-input-modal').val();
            $('#joindate').val(res.JoinDate);
            $('#taxcode-input').val(res.PersonalTaxCode);
            $('#gender-input').val(res.GenderName);
            $('#combobox-gender div').removeClass('combobox-items-select');
        }).fail(function (res) {
            switch (res.status) {
                case 500:
                    alert('Có lỗi từ server, vui lòng thử lại');
                    break;
                case 400:
                    alert('Dữ liệu không hợp lệ');
                    break;
                default:
                    break;
            }
        })
    }
    /**------------------------------------------------
     * Reset các thông tin đã điền trong form thêm nhân viên
     * created by: NHNGHIA  (19/7/2021)
     */
    resetInput() {
        $('.form-info input').val(null);
    }

    /**----------------------------------------------
     * focus vào ô mã nhân viên\
     * created by: NHNGHIA (19/7/2021)
     */
    forCusInput() {
        $('#code-input').focus();
    }

    /**------------------------------------
     * Xóa một nhân viên theo id
     * @param {string} id 
     */
    deleteEmployee(id){
        try {
            $.ajax({
                url: `${ConfigApi.urlv1}Employee/${id}`,
                method: 'delete'
            }).done(function(res){
                alert('Xóa nhân viên thành công');
            }).fail(function(res){
                alert('Xóa nhân viên thất bại');
                console.log(res);
            })
        } catch (error) {
            console.log(error);
        }
    }
}