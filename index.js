const express = require('express')
const app = express()
const port = 3000
const {fetchGraphQL} = require('./helperFunctions')
const {GET_CATEGORIES, CREATE_WISHLISTITEM} = require('./schemas')
const fetch = require('node-fetch');

app.use(express.json())

app.post('/wishlistItemCreationProcess', async (req, res) => {
  const categoriesRaw = await fetchGraphQL(GET_CATEGORIES)
  const categories = categoriesRaw.data.category
  const listOfCategories = categories.map(category => category.name)

  var raw = JSON.stringify({
    "request": req.body.input.request,
    "categories": listOfCategories
  });

  var requestOptions = {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: raw,
  };
  console.log(req.body.input.request);
  console.log(listOfCategories);
  const categoryMatch = await fetch("http://127.0.0.1:5000/hf/", requestOptions).then((res) =>
    res.json()
  );
  console.log(categoryMatch);
  const item = categoryMatch.item
  const categoryMatchObj = categories.find(category => category.name === categoryMatch.category)
  
  const createWishlistItem = await fetchGraphQL( CREATE_WISHLISTITEM, {
    item: item,
    categoryId: categoryMatchObj.id,
    customerId: req.body.input.customerId,
    lat: req.body.input.lat,
    lng: req.body.input.lng,
    request: req.body.input.request,
    timeCreated: new Date().toISOString()
  })
  const wishlistItemId = createWishlistItem.data.insert_wishlistItem.returning[0].id
  
  res.json({id: wishlistItemId})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})