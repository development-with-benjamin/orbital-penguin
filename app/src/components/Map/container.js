import { connect } from 'react-redux';
import Map from './index';
import fetchCategories from '../../redux/action-creators/fetch-categories';

const mapStateToProps = (state) => (
  {
    categories: state.categories,
    category: state.category,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    onLoadData: () => {
      dispatch(fetchCategories());
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Map);
