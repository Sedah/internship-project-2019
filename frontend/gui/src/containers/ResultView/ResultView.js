import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/AttemptActions";
import { ShowResult } from "../../components/ShowResult";


class ResultView extends React.Component {
  componentDidMount() {
    const attemptId = this.props.match.params.attemptId;
    console.log(attemptId);
    this.props.attemptFetch(attemptId);
  }

  render() {
    console.log(this.props.user_attempt.data)
    return (
      <div>
        <ShowResult data={this.props.user_attempt.data} />

      </div>
    );
  }
}
const mapStateToProps = (state) => { 
  return { user_attempt: state.user_attempt };
}

const mapDispatchToProps = dispatch => {
  return {
    attemptFetch: (attemptId) => dispatch(actions.attemptFetch(attemptId)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultView);
