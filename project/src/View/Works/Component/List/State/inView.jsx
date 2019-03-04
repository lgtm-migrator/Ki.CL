const actions = {
  updateInView: 'UPDATE_IN_VIEW'
};

const defaultState = {
  inView: ''
};

const mapDispatchToProps = dispatch => ({
  updateInView(inView) {
    dispatch({ type: actions.updateInView, inView });
  }
});

const mapStateToProps = state => ({
  inView: state.inView
});

const reducers = {
  inView(defaultInView = defaultState.inView, { type, inView }) {
    switch (type) {
      case actions.updateInView:
        return inView;

      default:
        return defaultInView;
    }
  }
};

export default { mapDispatchToProps, mapStateToProps, reducers };
