
class Common { 
    
    
    constructor() {
    }

    /**------------------------------------------------
    * Format ngày tháng năm sinh thành dạng dd/mm/yyyy
    * @param {any} dob tham số có kiểu dữ liệu bất kì
    * @returns 
    * created by: NHNGHIA (19/7/2021)
    */
    dobFormat(dob) {
        if (dob != null) {
            var date = new Date(dob);
            var day = date.getDate();
            var mon = date.getMonth() + 1;
            var year = date.getFullYear();
            day = day < 10 ? '0' + day : day;
            mon = mon < 10 ? '0' + mon : mon;
            return day + '/' + mon + '/' + year;
        } else return '';
    }
    /**---------------------------------------------------------
    * Format ngày tháng năm sinh từ bảng vào form sửa thông tin
    * @param {date} dob 
    * @returns 
    */
    dobFormatToForm(dob) {
        if (dob != null) {
            var date = new Date(dob);
            var day = date.getDate();
            var mon = date.getMonth() + 1;
            var year = date.getFullYear();
            day = day < 10 ? '0' + day : day;
            mon = mon < 10 ? '0' + mon : mon;
            return year + '-' + mon + '-' + day;
        } else return '';
    }
    /**-------------------------------------------------------
    * Format số điện thoại, nếu giá trị là null thì trả về ''
    * @param {*} phone 
    * @returns '' nếu phone = null, phone nếu phone !=null;
    * created by: NHNGHIA (19/7/2021)
    */
    formatPhone(phone) {
        if (phone == null) {
            return '';
        } else return phone;
    }

    /** ---------------------------------------------------
     * Format giới tính, nếu giá trị là null thì trả về ''
     * @param {any} gender tham số có kiểu dữ liệu bất kì
     * @returns 
     * created by: NHNGHIA (19/7/2021)
     */
    genderFomat(gender) {
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
    emailFormat(email) {
        if (email == null) {
            return '';
        } else return email
    }

    /** ---------------------------------------------------
     * Format postion, nếu giá trị là null thì trả về ''
     * @param {any} position tham số là kiểu dữ liệu bất kì
     * @returns 
     * created by: NHNGHIA (19/7/2021)
     */
    positionFomat(position) {
        if (position == null) {
            return '';
        } else return position;
    }

    /**------------------------------------------------------
     * Format department, nếu giá trị là null thì trả về ''
     * @param {any} department tham số là kiểu dữ liệu bất kì
     * @returns 
     * created by: NHNGHIA (19/7/2021)
     */
    departmentFormat(department) {
        if (department == null)
            return '';
        else return department;
    }


    /**-------------------------------------------
     * Format salary thành dạng 1.000.000.000
     * @param {number} salary kiểu dữ liệu là một số
     * @returns 
     * created by: NHNGHIA (19/7/2021)
     */
    salaryFormat(salary) {
        var result = '';
        if (salary != null) {
            for (var i = String(salary).length; i > 0; i = i - 3) {
                if (i > 3) {
                    var number = String(salary).slice(i - 3, i);
                    result += number.split("").reverse().join("") + ".";
                } else {
                    var number = String(salary).slice(0, i);
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
    statusFormat() {
        if (status == null) {
            return '';
        } else return status;
    }

    /**
     * Kiểm tra các trường input đã được nhập chưa, nếu chưa nhập sẽ chuyển
     * boder thành màu đỏ 
     */
    requiredInput() {
        $('input[required]').blur(function () {
            let val = $(this).val();
            if (val == '') {
                $(this).css('border', '1px solid #FF4747');
                $(this).attr('title', 'Thông tin này bắt buộc nhập');
            } else {
                $(this).css('border', '1px solid #bbbbbb');
                $(this).removeAttr('title');
            }
        })
    }

    /**--------------------------------------------------------------
     * Lấy tên phòng ban theo id
     * @param {string} id tham số truyền vào là id của một phòng ban
     * return: tên phòng ban
     * created by: NHNGHIA (24/7/2021)
     */
    async getDepartmentNameById(id) { 
        var name = '';
        if(id != null){
            try {
                await $.ajax({
                    url: `http://cukcuk.manhnv.net/api/Department/${id}`,
                    method: 'GET'
                }).done(function (res) {
                    name = res.DepartmentName;
                }).fail(function (res) {    
                    switch (res.status) {
                        case 500:
                            alert('Lấy dữ liệu phòng ban thất bại, vui lòng thử lại');
                            break;
                        case 400:
                            alert('Dữ phòng ban không hợp lệ');
                            break;
                        default:
                            break;
                    }
                })
            } catch (error) {
                console.log(error);
            }
        } else return '';
        return name;
    }

    /**
     * Lấy thông tin của một vị trí theo phòng ban
     * @param {id} id tham số là id của một vị trí 
     */
    async getPositionById(id) {
        var name ='';
        if(id != null){
            try {
                await $.ajax({
                    url: `http://cukcuk.manhnv.net/v1/Positions/${id}`,
                    method: 'GET'
                }).done(function (res) {
                    name = res.PositionName;
                }).fail(function (res) {
                    switch (res.status) {
                        case 500:
                            alert('Lấy dữ liệu vị trí thất bại, vui lòng thử lại');
                            break;
                        case 400:
                            alert('Dữ liệu vị trí không hợp lệ');
                            break;
                        default:
                            break;  
                    }
                })
            }  catch (error) {
                console.log(error);
            }
        } else return '';   
        return name;

    }


    /**
     * Reset value của tất cả các input có class là tham số
     * @param {string} name tham số truyền vào là tên một class
     */
    resetInputValueOfClass(name){
        $(`.${name} input`).attr('value','');
    }

    /**
     * Đóng một thẻ div bằng id
     * @param {id} id tham số truyền vào là id
     */
    closeADivById(id){
        $(`#${id}`).css('display','none');
    }

    /**
     * Mở một thẻ div bằng id
     * @param {id} id 
     */
    openADivById(id){
        $(`#${id}`).css('display','block');
    }

    /**
     * Đóng thẻ div bằng tên class
     * @param {classname} classname 
     */
    closeADivByClass(classname) {
        $(`.${classname}`).css('display','none');
    }

    /**
     * Reset border khi ấn vào nút thêm
     */
    resetBorder(){
        $(`input[required]`).css('border','1px solid #bbbbbb');
    }

    /**
     * Kiểm tra các trường bắt buộc đã được nhập hay chưa
     */
    checkInputRequire(){
        var check = null;
        $('input[required]').each(function() {
            if($(this).val() == ''){
                $(this).css('border', '1px solid #FF4747');
                $(this).focus();
                check = 0;
                return false;
            } else check = 1;
        })
        return check;
    }

    resetItemSelect(id){
        $(`#${id} div`).removeClass('combobox-items-select');
    }
} 
