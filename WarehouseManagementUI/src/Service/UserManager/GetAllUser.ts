import axios from "axios";
import { ref, watch } from "vue";
import { axiosInstance } from "../axiosConfig";
import type { User } from "@/Models/IdentityUser";
// let data: any = ref([]);

export const fetchData = async () => {

  let data = <User><unknown>[]
  try {
    await axiosInstance
      .get("UserManagement")
      .then((respons) => (data = respons.data.data));
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
  return data
};