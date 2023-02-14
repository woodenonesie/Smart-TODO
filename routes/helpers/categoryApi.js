const axios = require('axios');

const newCategory = (task) => {
  const apiKey = process.env.GOOGLE_KEY;
  const itemCategory = {
    "To Watch": ["Comics & Animation", "Film", "TV", "Movie", "Movies", "Video"],
    "To Buy": ["Music & Audio", "Autos & Vehicles", "Computers & Electronics", "Games", "Crafts", "Home & Garden", "Animal Products & Services", "Real Estate", "Shopping", "Sporting Goods"],
    "To Eat": ["Food & Drink"],
    "To Read": ["Books & Literature", "News"]
  }
  // Send a POST request
  return axios({
    method: 'post',
    url: `https://language.googleapis.com/v1/documents:classifyText?key=${apiKey}`,
    data: {
      "document": {
        "type": "PLAIN_TEXT",
        "content": task
      },
      "classificationModelOptions": {
        "v2Model": {
          "contentCategoriesVersion": "V2"
        }
      }
    }
  })
    .then((res) => {
      const categories = res.data.categories;
      if (categories.length === 0) {
        return "Other";
      } else {
        const nameCategory = categories[0].name;
        for (const category in itemCategory) {
          for (const item of itemCategory[category]) {
            if (nameCategory.includes(item)) {
              return category;
            }
          }
        }
        return "Other";
      }
    })
};


exports.newCategory = newCategory;
