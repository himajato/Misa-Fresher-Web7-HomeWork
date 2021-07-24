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
        this.getDepartment();
        this.getPosition();
    }

    //Lấy dữ liệu về
    loadData() {
        try {
            $('tbody').empty();
            $.ajax({
                url: 'http://cukcuk.manhnv.net/v1/Employees',
                method: 'GET',
                async: false
            }).done(function (res) {
                var data = res;
                debugger
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
                                    <td>${ma}</td>
                                    <td>${fullName}</td>
                                    <td>${Common.genderFomat(gender)}</td>
                                    <td class="text-align-center">${Common.dobFormat(dob)}</td>
                                    <td class="text-align-center">${Common.formatPhone(phone)}</td>
                                    <td>${Common.emailFormat(email)}</td>
                                    <td>${Common.positionFomat(position)}</td>
                                    <td>${Common.departmentFormat(department)}</td>
                                    <td class="text-align-right salary">${Common.salaryFormat(salary)}</td>
                                    <td>${Common.statusFormat(status)}</td>
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


    //Khởi tạo dữ liệu
    eventInit() {
        var self = this;
        $('#btn-cbb-1').on('click', function () {
            var display = $('#combobox-data-1').css('display');
            if (display == 'none') {
                $('#combobox-data-1').css('display', 'block');
                $('#icon-dropdown-department').css('transform', 'rotate(180deg)');
            } else {
                $('#combobox-data-1').css('display', 'none');
                $('#icon-dropdown-department').css('transform', 'rotate(0deg)');
            }
        })

        // $('#combobox-data-1').on('focusout',function(){
        //     $('#combobox-data-1').css('display', 'none');
        //     $('#icon-dropdown-department').css('transform', 'rotate(0deg)');
        // })


        $('#btn-add-employee').on('click', function () {
            self.formMode = 1;
            $('.modal').css('display', 'block');
            self.forCusInput();
            self.getNewEmpCode();
            Common.requiredInput();
            self.resetInput();
        })

        $('#btn-close-modal').on('click', function () {
            $('.modal').css('display', 'none');
        })

        $('#btn-cancel').on('click', function () {
            $('.modal').css('display', 'none');
        })

        $('#btn-cbb-2').on('click', function () {
            var display = $('#combobox-data-2').css('display');
            if (display == 'none') {
                $('#combobox-data-2').css('display', 'block');
                $('#icon-dropdown-position').css('transform', 'rotate(180deg)');
            } else {
                $('#combobox-data-2').css('display', 'none');
                $('#icon-dropdown-position').css('transform', 'rotate(0deg)');
            }
        })

        // $('#combobox-2').on('focusout',function(){
        //     $('#combobox-data-2').css('display', 'none');
        //     $('#icon-dropdown-position').css('transform', 'rotate(0deg)');
        // })

        $('#btn-combobox-gender').on('click', function () {
            var display = $('#combobox-gender').css('display');
            if (display == 'none') {
                $('#combobox-gender').css('display', 'block');
                $('#icon-dropdown-gender').css('transform', 'rotate(180deg)');
            } else {
                $('#combobox-gender').css('display', 'none');
                $('#icon-dropdown-gender').css('transform', 'rotate(0deg)');
            }
        })

        // $('#cbb-gender').on('focusout', function() {
        //     $('#combobox-gender').css('display', 'none');
        //     $('#icon-dropdown-gender').css('transform', 'rotate(0deg)');
        // })

        $('#gender-male').on('click', function () {
            var value = $('#gender-male').html();
            $('#gender-input').val(value);
            $('#gender-input').attr('gender-id', '1');
            $('#combobox-gender').css('display', 'none');
            $('#icon-dropdown-gender').css('transform', 'rotate(0deg)');
        })

        $('#gender-female').on('click', function () {
            var value = $('#gender-female').html();
            $('#gender-input').val(value);
            $('#gender-input').attr('gender-id', '0');
            $('#combobox-gender').css('display', 'none');
            $('#icon-dropdown-gender').css('transform', 'rotate(0deg)');
        })

        $('#gender-undefine').on('click', function () {
            var value = $('#gender-undefine').html();
            $('#gender-input').val(value);
            $('#gender-input').attr('gender-id', '2');
            $('#combobox-gender').css('display', 'none');
            $('#icon-dropdown-gender').css('transform', 'rotate(0deg)');
        })

        $('#btn-combobox-position').on('click', function () {
            var display = $('#combobox-position').css('display');
            if (display == 'none') {
                $('#combobox-position').css('display', 'block');
                $('#icon-position').css('transform', 'rotate(180deg)');
            } else {
                $('#combobox-position').css('display', 'none');
                $('#icon-position').css('transform', 'rotate(0deg)');
            }
        })

        // $('#cbb-position').on('focusout', function(){
        //     $('#combobox-position').css('display', 'none');
        //     $('#icon-position').css('transform', 'rotate(0deg)');
        // })

        $('#btn-combobox-room').on('click', function () {
            var display = $('#combobox-room-data').css('display');
            if (display == 'none') {
                $('#combobox-room-data').css('display', 'block');
                $('#icon-department').css('transform', 'rotate(180deg)');
            } else {
                $('#combobox-room-data').css('display', 'none');
                $('#icon-department').css('transform', 'rotate(0deg)');
            }
        })

        // $('#cbb-room').on('focusout', function(){
        //     $('#combobox-room-data').css('display', 'none');
        //     $('#icon-department').css('transform', 'rotate(0deg)');
        // })

        $('#edu-room').on('click', function () {
            var value = $('#edu-room').html();
            $('#department-input-modal').val(value);
            $('#combobox-room-data').css('display', 'none');
        })

        $('#hr-room').on('click', function () {
            //Lấy dữ liệu từ input
            var value = $('#hr-room').html();
            $('#department-input-modal').val(value);
            $('#combobox-room-data').css('display', 'none');
        })

        $('#manage-room').on('click', function () {
            var value = $('#manage-room').html();
            $('#department-input-modal').val(value);
            $('#combobox-room-data').css('display', 'none');
        })

        $('#salary-input').on('input', function () {
            var value = $('#salary-input').val();
            var afterformat = String(value).replaceAll('.', '');
            $('#salary-input').val(Common.salaryFormat(afterformat));
        })


        $('#btn-refresh').on('click', function () {
            loadData();
        });

        $('table').on('dblclick', 'tbody tr', function () {
            self.formMode = 0;
            $('.modal').css('display', 'block');
            self.EmployeeId = $(this).attr('id');
            self.getEmployeeByIdToForm(self.EmployeeId);

        })

        $('#btn-save').on('click', function () {
            if (self.formMode == 1) {
                self.addNewEmployee();
                $('.modal').css('display', 'none');
            } else {
                self.updateEmployee(self.EmployeeId);
                $('.modal').css('display', 'none');
            }
        })

    }

    //thêm mới nhân viên
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
        debugger
        try {
            $.ajax({
                url: 'http://cukcuk.manhnv.net/v1/Employees',
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
     */
    updateEmployee(id) {
        var self = this;
        var employee = {
        };
        employee.EmployeeCode = $('#code-input').val();
        employee.Gender = $('#gender-input').attr('gender-id');
        employee.FullName = $('#name-input').val();
        employee.Salary = $('#salary-input').val().replaceAll('.', '');
        employee.PositionId = $('#modal-position-input').attr('position-id');
        employee.DepartmentId = $('#department-input-modal').attr('data-id');
        employee.Email = $('#email-input').val();
        employee.PhoneNumber = $('#phone-input').val();
        employee.IdentityNumber = $('#identity-input').val();
        employee.DateOfBirth = $('#dob-input').val();
        try {
            $.ajax({
                url: `http://cukcuk.manhnv.net/v1/Employees/${id}`,
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
                url: 'http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode',
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
    */
    getDepartment() {
        try {
            $.ajax({
                url: 'http://cukcuk.manhnv.net/api/Department',
                method: 'GET',
                async: false
            }).done(function (res) {
                var data = res;
                $.each(data, function (index, item) {
                    var id = item.DepartmentId;
                    var name = item.DepartmentName;
                    var code = item.DepartmentCode;
                    var data = `
                                <div id="${code}" data-id="${id}" class="combobox-items">${name}</div>
                                `
                    var data2 = `
                                <div id="${id}" class="combobox-items">${name}</div>
                                `
                    $('#combobox-data-1').append(data);
                    $('#combobox-room-data').append(data2);
                })
                $.each(data, function (index, item) {
                    var code = item.DepartmentCode;
                    var name = item.DepartmentName;
                    $(`#${code}`).on('click', function () {
                        $('#department-input-1').val(name);
                        $('#combobox-data-1 div').removeClass('combobox-items-select');
                        $(this).addClass('combobox-items-select');
                        $('#combobox-data-1').css('display', 'none');
                        $('#icon-dropdown-department').css('transform', 'rotate(0deg)');
                    })
                })
                $.each(data, function (index, item) {
                    var id = item.DepartmentId;
                    var name = item.DepartmentName;
                    $(`#${id}`).on('click', function () {
                        $('#department-input-modal').val(name);
                        $('#department-input-modal').attr('data-id', `${id}`)
                        $('#combobox-room-data div').removeClass('combobox-items-select');
                        $(this).addClass('combobox-items-select');
                        $('#combobox-room-data').css('display', 'none');
                        $('#icon-department').css('transform', 'rotate(0deg)');
                    })
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
    */
    getPosition() {
        try {
            $.ajax({
                url: 'http://cukcuk.manhnv.net/v1/Positions',
                method: 'GET',
                async: false
            }).done(res => {
                var data = res;
                $.each(data, function (index, item) {
                    var id = item.PositionId;
                    var name = item.PositionName;
                    var code = item.PositionCode;
                    var data = `
                                <div id="${code}" data-id="${id}" class="combobox-items">${name}</div>
                                `
                    var data2 = `
                                <div id="${id}" class="combobox-items">${name}</div>
                                `
                    $('#combobox-data-2').append(data);
                    $('#combobox-position').append(data2);
                })
                $.each(data, function (index, item) {
                    var code = item.PositionCode;
                    $(`#${code}`).on('click', function () {
                        $('#position-input').val(item.PositionName);
                        $('#combobox-data-2 div').removeClass('combobox-items-select');
                        $(this).addClass('combobox-items-select');
                        $('#combobox-data-2').css('display', 'none');
                        $('#icon-dropdown-position').css('transform', 'rotate(0deg)');
                    })
                })
                $.each(data, function (index, item) {
                    var id = item.PositionId;
                    $(`#${id}`).on('click', function () {
                        $('#modal-position-input').val(item.PositionName);
                        $('#modal-position-input').attr('position-id', `${id}`);
                        $('#combobox-position div').removeClass('combobox-items-select');
                        $(this).addClass('combobox-item-select');
                        $('#combobox-position').css('display', 'none');
                        $('#icon-position').css('transform', 'rotate(0deg)');
                    })
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

    /**
    * Lấy dữ liệu của một nhân viên
    */
    getEmployeeByIdToForm(id) {
        $.ajax({
            url: `http://cukcuk.manhnv.net/v1/Employees/${id}`,
            method: 'GET'
        }).done(function (res) {
            $('#code-input').val(res.EmployeeCode);
            $('#name-input').val(res.FullName);
            $('#dob-input').val(Common.dobFormatToForm(res.DateOfBirth));
            $('#email-input').val(res.Email);
            $('#phone-input').val(res.PhoneNumber);
            $('#salary-input').val(Common.salaryFormat(res.Salary));
            $('#identity-input').val(res.IdentityNumber);
            $('#identity-date-input').val(Common.dobFormatToForm(res.IdentityDate));
            $('#identity-place-input').val(res.IdentityPlace);
            $('#department-input-modal').val(res.DepartmentName);
            $('#modal-position-input').val(res.PositionName);
            debugger
            $('#joindate').val(res.JoinDate);
            $('#taxcode-input').val(res.PersonalTaxCode);
            $('#gender-input').val(res.GenderName);
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
    /**
     * Reset các thông tin đã điền trong form thêm nhân viên
     * created by: NHNGHIA
     */
    resetInput() {
        $('.form-info input').val(null);
    }

    /**
     * focus vào ô mã nhân viên\
     * created by: NHNGHIA (19/7/2021)
     */
    forCusInput() {
        $('#code-input').focus();
    }
}