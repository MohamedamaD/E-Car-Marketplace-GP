const axios = require("axios");

const fetchCars = async (make, year, model, type) => {
  const options = {
    method: "GET",
    url: "https://car-data.p.rapidapi.com/cars",
    params: {
      limit: "10",
      page: "0",
      make: make || "",
      year: year || "",
      model: model || "",
      type: type || "",
    },
    headers: {
      "X-RapidAPI-Key": "ff70c6abf2mshf14ece9e1accdc1p193b3fjsn609e5e4cf82d",
      "X-RapidAPI-Host": "car-data.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = fetchCars;
