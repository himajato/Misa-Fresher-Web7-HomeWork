class Combobox {
    constructor(data, icon) {
        this.data = data;
        this.icon = icon;
    }

    /**----------------------------------------------
     * Xử lí sự kiện click vào combobox để hiển thị
     * @param {id} data tham số là id của data
     * @param {id} icon tham số là id của icon
     * created by: NGNGHIA (26/7/2021)
     */
    static displayCombobox(cbb, data, icon) {
        $(`#${cbb}`).on('click', function () {
            var dp = $(`#${data}`).css('display');
            if (dp == 'none') {
                $(`#${data}`).css('display', 'block');
                $(`#${icon}`).css('transform', 'rotate(180deg)');
            } else {
                $(`#${data}`).css('display', 'none');
                $(`#${icon}`).css('transform', 'rotate(0deg)');
            }
        })
    }

    static genderItemSelect(gender) {
        $(`#${gender}`).on('click', function () {
            var val = $(`#${gender}`).html();
            $('#gender-input').val(val);
            $('#combobox-gender').attr('display', 'none');
            $('#icon-dropdown-gender').css('transform', 'rotate(0deg)');
            switch (val) {
                case 'Nữ':
                    $('#gender-input').attr('gender-id', '0');
                    break;
                case 'Nam':
                    $('#gender-input').attr('gender-id', '1');
                    break;
                case 'Không xác định':
                    $('#gender-input').attr('gender-id', '2');
                    break;
                default:
                    break;
            }
        })
    }
    
    /**
     * Sử lí sự kiện chọn một item trong combobox
     * @param {id} id là id của item được chọn
     * @param {string} input là id của input của combobox 
     * @param {string} name là value của item
     * @param {string} data là data của combobox chứa các item
     * @param {string} icon là icon của combobox
     */
    static itemSelectCombobox(id, input, name, data, icon){
        $(`#${id}`).on('click', function() {
            $(`#${data} i`).css('visibility','hidden');
            $(`#${input}`).val(name);
            $(`#${input}`).attr('data-id',`${id}`);
            $(`#${data} div`).removeClass('combobox-items-select');
            $(this).children('i').css('visibility','visible');
            $(this).addClass('combobox-items-select');
            $(`#${data}`).attr('display','none');
            $(`#${icon}`).css('transform', 'rotate(0deg)');
        })
    }
}