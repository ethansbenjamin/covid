import axios from 'axios';
// axios is used to make api calls

const url = "https://covid19.mathdro.id/api";

// export it to use it
export const fetchData = async(country) => {
    let changeableUrl = url;
    // aynchronous function, deals with Promises, aync await
    if (country){
        changeableUrl = `${url}/countries/${country}`;
    }
    try{
        const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(changeableUrl);

        return { confirmed, recovered, deaths, lastUpdate }
    } catch(error){
        console.log(error);
    }
}

export const fetchDailyData = async () =>{
    try{
        // $ is a custom string jeez
        const {data} = await axios.get(`${url}/daily`);

        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }))

        return modifiedData;
    } catch(error){

    } 
}

export const fetchCountries = async () => {
    try{
        const { data: { countries }}= await axios.get(`${url}/countries`);

        return countries.map((country) => country.name);
    } catch (error) {
        return error;
    }
}