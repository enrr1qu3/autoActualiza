import axios from "axios";
import { baseURL } from "../env/enviroment";


export async function getReportsCars(){
  try{
      let list = await axios.get(`${baseURL}Reports`);
      console.log(1);
      return { error: false, data: list.data.data.$values }
  }catch(error){
      return{ error: true, msg: error }
  }
};


export async function ReportsByCarId (id){
    try{
      let reportsList = await axios.get(`${baseURL}Reports/GetByVehicleId?VehicleId=${id}`)
      console.log(reportsList['data']['data']['$values']);
      return {
        error: false, data: reportsList['data']['data']['$values']
      }
    }

    catch(error){
        console.log(error);
        return(false)
    }

}