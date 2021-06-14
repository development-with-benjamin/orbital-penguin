const initialState = [];

const CategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "getCategories/success":
        return action.payload
    default:
      return state
  }
}

export default CategoriesReducer