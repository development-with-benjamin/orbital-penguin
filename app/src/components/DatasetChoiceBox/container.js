import { connect } from 'react-redux';
import DatasetChoiceBox from './index';
import fetchCategory from '../../redux/action-creators/fetch-category';

const mapStateToProps = (state) => (
  {
    categories: state.categories,
    category: state.category,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    onGetData: (data) => {
      dispatch(fetchCategory(data));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(DatasetChoiceBox);
