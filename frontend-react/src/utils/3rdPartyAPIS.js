import axios from "axios";
export const classifyCardImage = async (image) => {
  console.log(image);
  axios({
    method: "POST",
    url: "https://outline.roboflow.com/card_finder-esjuk/2",
    params: {
      api_key: "0WbdqkhmZHk6xYDYg1mS",
},
    data: image,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error.message);
      console.log(error);
    });
};
