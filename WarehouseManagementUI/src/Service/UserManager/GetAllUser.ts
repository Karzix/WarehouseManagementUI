import axios from "axios";
import { ref, watch } from "vue";
import { axiosInstance } from "../axiosConfig";
import type { User } from "@/Models/IdentityUser";
import type { SearchRequest } from "@/Models/Request/ShearchRequest";
// let data: any = ref([]);

export const fetchData = async (model:SearchRequest): Promise<User[]> => {
  let data2 = [] as User[];
  try {
    await axiosInstance
      .post("UserManagement/search",model)
      .then((respons) => (data2 = respons.data.data.data));
    console.log(data2);
  } catch (error) {
    // Handle any errors here
    console.error("Error:", error);
  }
  return data2;
};