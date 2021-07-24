$(document).ready(function () {

})



class Common{
    constructor() {
    }

    /**------------------------------------------------
    * Format ngày tháng năm sinh thành dạng dd/mm/yyyy
    * @param {any} dob tham số có kiểu dữ liệu bất kì
    * @returns 
    * created by: NHNGHIA (19/7/2021)
    */
    static dobFormat(dob) {
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
    static dobFormatToForm(dob) {
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
    static formatPhone(phone) {
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
    static genderFomat(gender) {
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
    static emailFormat(email) {
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
    static positionFomat(position) {
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
    static departmentFormat(department) {
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
    static salaryFormat(salary) {
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
    static statusFormat() {
        if (status == null) {
            return '';
        } else return status;
    }

    /**
     * Kiểm tra các trường input đã được nhập chưa, nếu chưa nhập sẽ chuyển
     * boder thành màu đỏ 
     */
    static requiredInput() {
        $('input[required]').blur(function () {
            let val = $(this).val();
            if (val == '') {
                $(this).css('border', '1px solid red');
                $(this).attr('title', 'Thông tin này bắt buộc nhập');
            } else {
                $(this).css('border', '1px solid #bbbbbb');
                $(this).removeAttr('title');
            }
        })
    }
}