const initialState = [];

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "getCategory/success":
        return action.payload
    default:
      return state
  }
}

export default CategoryReducer