const url = window.location.hash.substr(1);
const projectId = url.split('/')[2];

const actions = {
  updateInView: 'UPDATE_IN_VIEW'
};

const defaultState = {
  inView: {
    shouldRedirect: Boolean(projectId),
    url: projectId && url
  }
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
  inView(previousInView = defaultState.inView, { type, inView }) {
    switch (type) {
      case actions.updateInView:
        if (
          previousInView.shouldRedirect !== inView.shouldRedirect ||
          previousInView.url !== inView.url
        ) {
          return inView;
        }

        return previousInView;

      default:
        return previousInView;
    }
  }
};

export default { mapDispatchToProps, mapStateToProps, reducers };
