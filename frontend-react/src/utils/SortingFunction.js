export const sortCars = (sortOption, array) => {
  if (sortOption === "lowToHigh") {
    return array.slice().sort((a, b) => a.price - b.price);
  } else if (sortOption === "highToLow") {
    return array.slice().sort((a, b) => b.price - a.price);
  } else if (sortOption === "oldToNew") {
    return array.slice().sort((a, b) => a.year - b.year);
  } else if (sortOption === "newToOld") {
    return array.slice().sort((a, b) => b.year - a.year);
  } else if (sortOption === "mileageLowToHigh") {
    return array.slice().sort((a, b) => a.mileage - b.mileage);
  } else if (sortOption === "mileageHighToLow") {
    return array.slice().sort((a, b) => b.mileage - a.mileage);
  } else {
    return array.slice();
  }
};

export const compareFeature = (feature, compareOptions, array) => {
  switch (compareOptions) {
    case "transmission":
      return array.slice().filter((item) => item.transmission === feature);

    default:
      return array;
  }
};
