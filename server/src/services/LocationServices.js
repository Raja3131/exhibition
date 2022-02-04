import { Country,State,City}  from 'country-state-city-js'

export const LocationServices = {
    getCountry: async () => {
        const country = await Country({states: true,cities: true});
        return country;
    },
    getStateByCountry: async (country) => {
        const state = await State(`${country}`,{cities: true});
        return state;
       
    },
    getCityByState: async (country,state) => {
        const city = await City(`${country}`,`${state}`);
        return city;
    }

}