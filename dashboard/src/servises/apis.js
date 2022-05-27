import axios from "axios";

const URL = process.env.REACT_APP_API_BASE_URL

export const getMonthData = async (month)=> {
    
    console.log(month)
    const result = await axios.get(`${URL}/users/`+month);
    if(result.data[0])
    return result.data[0];
    else
    return 0

}

export const createMonthData = async (addresses , balance , time)=> {
    
    
    const result = await axios.post(`${URL}/users/`, {body :{addresses , balance , time}});
    console.log("api :" , result)
    if(result.data)
    return result.data;
    else
    return 0

}

// {"addresses" : ["0x48d3788eacEe5235Fa855fE23F22A77d779e9B1C","0x48d3788eacEe5235Fa855fE23F22A77d779e9B1C"], "balance" : ["20","30"],
// "time" : 1653486432 ,
//     "month" : 3
// }