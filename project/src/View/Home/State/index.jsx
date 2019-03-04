import { asyncReducers, connect } from 'State';

import atLanding from './atLanding';

const reducers = {
  ...atLanding.reducers
};

const mapStateToProps = state => ({
  ...atLanding.mapStateToProps(state)
});

const mapDispatchToProps = dispatch => ({
  ...atLanding.mapDispatchToProps(dispatch)
});

const connecter = connect(
  mapStateToProps,
  mapDispatchToProps
);

asyncReducers(reducers);

export default { connecter };
