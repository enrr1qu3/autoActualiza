import axios from "axios";
import { baseURL } from "../env/enviroment";

export async function getRegisteredCars(){
    try{
        let list = await axios.get(`${baseURL}RegisteredCars`);
        console.log(1);
        return { error: false, data: list.data.data.$values }
    }catch(error){
        return{ error: true, msg: error }
    }
};


export async function getRegisteredCarsById(id){
    try{
        let list = await axios.get(`${baseURL}RegisteredCars/GetById?VehicleId=${id}`);
        console.log('Lista aqui');
        console.log(list.data.data);
        return { error: false, data: list['data']['data'] }
    }catch(error){
        return{ error: true, msg: 'errorGetList' }
    }
};

export async function postRegisteredCar(body){
    const formData = new FormData();
    formData.append('Name',body.Name);
    formData.append('Year',body.Year);
    formData.append('Serie',body.Serie);
    formData.append('Color',body.Color);
    formData.append('KM',body.KM);
    formData.append('InitialFuel',body.InitialFuel);
    formData.append('Owner',body.Owner);
    formData.append('InsurancePolicy',body.InsurancePolicy);
    formData.append('IsUtilitary',body.IsUtilitary);
    formData.append('CarImageFile',body.CarImageFile);
    formData.append('HydraulicLift',body.HydraulicLift);
    formData.append('SpareWheel',body.SpareWheel);
    formData.append('Extinguisher',body.Extinguisher);
    formData.append('Serviced',body.Serviced);
    formData.append('LastServiceDate',body.LastServiceDate);
    console.log(body);
    console.log(body.Owner);
    console.log(formData);
   
    try{
        let list = await axios.post(`${baseURL}RegisteredCars/Register`, formData);
        return { error: false, data: list }
    }catch(error){
        return{ error: true, msg: error }
    }
};

export async function deleteRegisteredCars(id){
    try{
        let list = await axios.delete(`${baseURL}RegisteredCars/Delete?FirebaseId=${id}`);
        return { error: false, data: list }
    }catch(error){
        return{ error: true, msg: error }
    }
};


export async function putRegisteredCar(body){
    const formData = new FormData();
    formData.append('FirebaseId',body.FirebaseId);
    formData.append('Name',body.Name);
    formData.append('Year',body.Year);
    formData.append('Serie',body.Serie );
    formData.append('Color',body.Color );
    formData.append('KM',body.KM );
    formData.append('Owner',body.Owner );
    formData.append('InsurancePolicy',body.InsurancePolicy  );
    formData.append('IsUtilitary',body.IsUtilitary  );
    formData.append('NewCarImageFile',body.NewCarImageFile );
    formData.append('InitialFuel', body.InitialFuel);
    formData.append('HydraulicLift',body.HydraulicLift );
    formData.append('SpareWheel',body.SpareWheel );
    formData.append('Extinguisher',body.Extinguisher );
    formData.append('Serviced',body.Serviced );
    formData.append('LastServiceDate',body.LastServiceDate );
    console.log(body);
    console.log(body.Owner);
    console.log(formData);
   

    try{
        let list = await axios.put(`${baseURL}RegisteredCars/Update`, formData);
        return { error: false, data: list }
    }catch(error){
        return{ error: true, msg: error }
    }
};