import axios from "axios";
import { baseURL } from "../env/enviroment";

export async function getLastUsages(data){
    try{
        console.log(data);
        let list = await axios.post(`${baseURL}Usage/GetLastUsages`, data);
        return { error: false, data: list.data.data.$values }
    }catch(error){
        return{ error: true, msg: error }
    }
};

export async function UsagesByCarId (id){
    try{
      let usagesList = await axios.get(`${baseURL}Usage/GetByVehicle?vehicleId=${id}`)
      console.log(usagesList['data']['data']['$values']);
      return {
        error: false, data: usagesList['data']['data']['$values']
      }
    }

    catch(error){
        console.log(error);
        return(false)
    }

}
