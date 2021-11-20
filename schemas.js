const GET_CATEGORIES = `
query MyQuery {
  category {
    name
    id
  }
}
`

const CREATE_WISHLISTITEM = `
mutation MyMutation($categoryId: uuid = "", $customerId: uuid = "", $lat: Int = 10, $lng: Int = 10, $request: String = "", $item: String = "", $timeCreated: String = "") {
  insert_wishlistItem(objects: {categoryId: $categoryId, customerId: $customerId, lat: $lat, lng: $lng, request: $request, item: $item, timeCreated: $timeCreated}) {
    returning {
      id
      categoryId
      customerId
      id
      lat
      lng
      request
      item
    }
  }
}
`
// {
//  "item": "beer",
// 	"categoryId": "3410e2f3-8435-4c88-b76c-fd2f7d1d4e80",
//   "customerId": "2fa81068-baa8-4d41-a091-77a31f1ee0aa",
//   "lat": 10,
//   "lng": 10,
//   "request": "I could use sume Duff beer"
// }

module.exports = {
  GET_CATEGORIES,
  CREATE_WISHLISTITEM,
}