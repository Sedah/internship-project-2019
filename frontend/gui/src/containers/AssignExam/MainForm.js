import React, { Component } from "react"
import { connect } from "react-redux"

import FirstStep from "../AssignExam/form/FirstStep"
import SecondStep from "../AssignExam/form/SecondStep"
import ThirdStep from "../AssignExam/form/ThirdStep"

import * as assign_actions from "../../store/actions/AssignFormActions";

import Stepper from "../AssignExam/Stepper"

class FormPage extends Component {

    componentWillUnmount() {
        this.props.resetForm()
    }

    renderForm = (step) => {
        switch(step){
            case 1: return <FirstStep/>
            case 2: return <SecondStep/>
            case 3: return <ThirdStep/>
            default: 
        }
    }

    render() {
        return (
            <div className="form-page adaptive-content">
                <Stepper step={this.props.step}/><br/>
                {this.renderForm(this.props.step)}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    step: state.FormReducer.step
})

const mapDispatchToProps = (dispatch) => ({
    resetForm: () => dispatch(assign_actions.resetForm())
})

export default connect(mapStateToProps, mapDispatchToProps)(FormPage)