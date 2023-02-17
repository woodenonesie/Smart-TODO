const catCount = function (obj) {
  let finalObj = {
    watch: null,
    eat: null,
    read: null,
    buy: null,
    other: null,
  };
  for (let x in obj) {
    if (obj[x] !== undefined) {
      if (obj[x].category === "To Watch") {
        finalObj.watch = obj[x].count;
      }
      if (obj[x].category === "To Eat") {
        finalObj.eat = obj[x].count;
      }
      if (obj[x].category === "To Read") {
        finalObj.read = obj[x].count;
      }
      if (obj[x].category === "To Buy") {
        finalObj.buy = obj[x].count;
      }
      if (obj[x].category === "Other") {
        finalObj.other = obj[x].count;
      }
    }
  }
  return finalObj;
};

exports.catCount = catCount;
