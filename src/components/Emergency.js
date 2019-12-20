import React, { Component } from 'react';
import { Button, Table, Container } from 'reactstrap';
import { socket } from './Header';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

class Emergency extends Component {
    constructor() {
        super();
        this.state = {
            emergencies: []
        };
    }
    getData = emergencyItems => {
        console.log(emergencyItems);
        this.setState({emergencies: emergencyItems});
    };
    changeData = () => socket.emit('initial_data');
    componentDidMount() {
        let currentState = this;
        socket.emit('initial_data');
        socket.on('get_data', this.getData);
        socket.on('change_data', this.changeData);
    }
    componentWillUnmount() {
        socket.off('get_data');
        socket.off('change_data');
    }
    update = id => {
        socket.emit('update', id);
    }
    getEmergencyData() {
        return this.state.emergencies.map(emergency => {
            return (
                <tr key={emergency._id}>
                    <td>{emergency.code}</td>
                    <td>{emergency.description}</td>
                    <td>
                        <button onClick={() => this.update(emergency._id)}>Update</button>
                    </td>
                </tr>
            )
        })
    }
    render() {
        return (
            <Container>
                <h2 className="h2Class">Emergency Area</h2>
                <ReactHTMLTableToExcel
                    id="xls-button"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Download as XLS"
                    />
                    <Table striped id="table-to-xls">
                        <thead>
                            <tr>Emergency code</tr>
                            <tr>Description</tr>
                        </thead>
                        <tbody>{this.getEmergencyData()}</tbody>
                    </Table>
            </Container>
        );
    }
}