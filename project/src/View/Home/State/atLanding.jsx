const actions = {
  updateAtLanding: 'UPDATE_AT_LANDING',
};

const defaultState = {
  atLanding: true,
};

const mapDispatchToProps = dispatch => ({
  updateAtLanding(atLanding) {
    dispatch({ type: actions.updateAtLanding, atLanding });
  },
});

const mapStateToProps = state => ({
  atLanding: state.atLanding,
});

const reducers = {
  atLanding(defaultValue = defaultState.atLanding, { type, atLanding }) {
    switch (type) {
      case actions.updateAtLanding:
        return atLanding;

      default:
        return defaultValue;
    }
  },
};

export default { mapDispatchToProps, mapStateToProps, reducers };
