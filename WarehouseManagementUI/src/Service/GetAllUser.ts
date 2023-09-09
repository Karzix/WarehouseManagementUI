import axios from "axios";

var url = 'https://localhost:7234/api/UserManagement'
export async function GetAllUser () {
    var array:any = [] 
    await axios.get(url)
    .then(data => array = data.data.data)
    console.log (array)
    return array

}
