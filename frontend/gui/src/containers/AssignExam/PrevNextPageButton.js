import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Row, Col } from "antd";

import * as actions from "../../store/actions/AssignFormActions";

class PrevNextPageButton extends Component {
  render() {
    return (
      <div className="space-between margin-top-24">
        <Row>
          <Col span={12}>
            <div>
              {!!this.props.prev && (
                <Button onClick={() => this.props.setStep(this.props.prev)}>
                  Prev
                </Button>
              )}
            </div>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
            <div >
              {!!this.props.next && (
                <Button
                  disabled={this.props.disableNext}
                  type="primary"
                  onClick={() =>
                    !this.props.disableNext
                      ? this.props.setStep(this.props.next)
                      : () => {}
                  }
                >
                  Next
                </Button>
              )}
              {!!this.props.submit && (
                <div>
                  <Button type="primary" onClick={() => this.props.submit()}>
                    Submit
                  </Button>
                </div>
              )}
            </div>
            </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  setStep: step => dispatch(actions.setStep(step))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrevNextPageButton);
