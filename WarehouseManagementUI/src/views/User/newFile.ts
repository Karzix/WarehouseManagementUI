import { fetchData } from "../../Service/UserManager/GetAllUser";
import { Search, data } from "./User.vue";

fetchData(Search).then((result) => {
data.value = result;
console.log(data);
});
