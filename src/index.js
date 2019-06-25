import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Number(props) {
    return (
        <button
            className="numberButton"
            onClick={props.onClick}>
            {props.value}
        </button>
    )
}

function Operator(props) {
    let clickedClass;
    clickedClass = props.clicked ? "operatorButtonClicked" : "operatorButtonNotClicked";
    return (
        <button
            className={clickedClass}
            onClick={props.onClick}>
            {props.value}
        </button>
    )
}

function Display(props) {
    let output;
    if (props.result) {
        output = props.result
    } else if (props.number2){
        output = props.number + props.operator + props.number2
    }
    else if (props.operator) {
        output = props.number + props.operator
    } else if (props.number) {
        output = props.number
    } else {
        output = 0
    }
    return (
        <h3>{output}</h3>
    )
}

class Calculator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedNumber: null,
            selectedNumber2: null,
            selectedOperator: null,
            result: null
        }
    }

    clearState(){
        this.setState({selectedNumber: null,
            selectedNumber2: null,
            selectedOperator: null,
            result: null})
    }

    handleClickNumber(i){
        if (this.state.result){
            this.clearState();
            this.setState({selectedNumber: i})
        } else if (this.state.selectedOperator){
            if (this.state.selectedNumber2){
                this.setState({selectedNumber2: "" + this.state.selectedNumber2 + i})
            } else {
                this.setState({selectedNumber2: i})
            }
        } else if (!this.state.selectedNumber){
            this.setState({selectedNumber: i})
        } else {
            this.setState({selectedNumber: "" + this.state.selectedNumber + i})
        }
    }

    handleClickOperator(operation){
        if (operation === "="){
            if (this.state.selectedOperator && this.state.selectedNumber2){
                this.setState({result: this.handleCalculation(this.state.selectedNumber, this.state.selectedOperator, this.state.selectedNumber2)});
            } else {
                window.alert("Please select two numbers and an operator before pressing =")
            }
        } else if(this.state.result){
            this.setState({selectedNumber: this.state.result,
                selectedOperator: operation,
                selectedNumber2: null,
                result: null})
        } else if(this.state.selectedNumber){
            this.setState({selectedOperator: operation})
        } else {
            window.alert("Select a number before an operation")
        }
    }

    handleCalculation(number1, operator, number2){
        switch (operator) {
            case "X":
                return (parseInt(number1) * parseInt(number2));
            case "%":
                return (parseInt(number1) / parseInt(number2));
            case "+":
                return (parseInt(number1) + parseInt(number2));
            case "-":
                return (parseInt(number1) - parseInt(number2));
            default:
                return (window.alert("An unexpected error has occurred, try again"))
        }
    }

    renderNumber(i) {
        return <Number
            value = {i}
            onClick = {() => this.handleClickNumber(i)}
        />
    }

    renderOperator(operation, clickedInput) {
        return <Operator
            value = {operation}
            clicked = {clickedInput}
            onClick = {() => this.handleClickOperator(operation)}
        />
    }

    renderDisplay(number, number2, operator, result){
        return <Display
            number = {number}
            number2 = {number2}
            operator = {operator}
            result = {result}
        />
    }

    render () {
        return (
            <div>
                <div className="display">
                    {this.renderDisplay(this.state.selectedNumber, this.state.selectedNumber2, this.state.selectedOperator, this.state.result)}
                </div>
                <div className="numbersBlock">
                    <div className="numberRow">
                        {this.renderNumber(1)}
                        {this.renderNumber(2)}
                        {this.renderNumber(3)}
                    </div>
                    <div className="numberRow">
                        {this.renderNumber(4)}
                        {this.renderNumber(5)}
                        {this.renderNumber(6)}
                    </div>
                    <div className="numberRow">
                        {this.renderNumber(7)}
                        {this.renderNumber(8)}
                        {this.renderNumber(9)}
                    </div>
                    <div className="zeroButton">
                        {this.renderNumber(0)}
                    </div>
                </div>
                <div className="operatorsColumn">
                    {this.renderOperator("X", false)}
                    {this.renderOperator("%", false)}
                    {this.renderOperator("+", false)}
                    {this.renderOperator("-", false)}
                    {this.renderOperator("=", false)}
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Calculator />,
    document.getElementById('root')
);
