import { combineReducers } from 'redux';
import CategoriesReducer from './categories-reducer';
import CategoryReducer from './category-reducer';

const rootReducer = combineReducers({
  categories: CategoriesReducer,
  category: CategoryReducer,
  //moneyTransactions: MoneyTransactionReducer,
});

export default rootReducer;
