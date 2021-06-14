const fetchCategoriesActionCreator = () => async (dispatch) => {
    try {
      await fetch('http://localhost:9000/categories')
        .then(async (response) => {
          const data = await response.json();
          if (!response.ok) {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          dispatch({
            type: 'getCategories/success',
            payload: data,
          });
          return data;
        })
        .catch((error) => {
          console.error('There was an error!', error);
        });
    } catch (exp) {
      dispatch({
        type: 'getCategories/error',
        payload: { exp },
      });
    }
  };
  
  export default fetchCategoriesActionCreator;
  