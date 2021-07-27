class Base{
    constructor(){

    }


    /**
     * 
     */
    static test(){
        
    }


    static loadData(){
        
    }
    static async getDepartmentNameById(id) {
        var name = '';
        if(id != null){
            try {
                await $.ajax({
                    url: `${ConfigApi.urlapi}Department/${id}`,
                    method: 'GET'
                }).done(function (res) {
                    name = res.DepartmentName;
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
        } else return '';
        return name;
    }

    /**
     * Lấy thông tin của một vị trí theo phòng ban
     * @param {id} id tham số là id của một vị trí 
     */
    static async getPositionById(id) {
        var name ='';
        if(id != null){
            try {
                await $.ajax({
                    url: `${ConfigApi.urlv1}Positions/${id}`,
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
}
