import {Component} from "react";
import {BaseLayout} from "../components/BaseLayout";
import axios from "axios";
import {Alert, Button, DatePicker, DatePickerProps, Input} from "antd";

export class CreateSecret extends Component {
    state = {
        secretText: '',
        expirationTime: 0,
        showAlert: false,
        alertType: undefined,
        alertMessage: '',
        alertDescription: ''
    };

    onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ showAlert: false });
        this.setState({ secretText: e.currentTarget.value });
    };

    datePickerOnChange: DatePickerProps['onChange'] = (date, dateString) => {
        this.setState({ expirationTime: dateString});
    };

    createSecret = (() => {
        const data = {
            secret: this.state.secretText,
            expireAfter: this.state.expirationTime !== 0 ? new Date(this.state.expirationTime).getTime() : 0
        };
        return axios.post('http://backend.secret.local/v1/secret', data).then((result) => {
            console.log(result);
            this.setState({ alertMessage: 'Success' });
            this.setState({ alertDescription: 'Your secret hash is: ' + result.data.hash + '\n Exiped at: ' + result.data.expiresAt });
            this.setState({ alertType: 'success' });
            this.setState({ showAlert: true });
        }).catch(() => {
            this.setState({ alertMessage: 'Error' });
            this.setState({ alertDescription: 'Invalid input' });
            this.setState({ alertType: 'error' });
            this.setState({ showAlert: true });
        })
    })

    render() {
        return (
            <>
                <BaseLayout>
                    <div className='getSecretContainer'>
                        <h1>Create secret</h1>
                        <Input placeholder="Your secret text" value={this.state.secretText} onChange={this.onChange}></Input>
                        <DatePicker placeholder='Select expiration time' className='createSecretDatePicker' showTime onChange={this.datePickerOnChange}/>
                        <Button className='getSecretButton' onClick={async () => {
                            await this.createSecret()
                        }}>Send</Button>
                        {this.state.showAlert &&
                            <Alert
                                message={this.state.alertMessage}
                                description={this.state.alertDescription}
                                type={this.state.alertType}
                                showIcon
                            />}
                    </div>
                </BaseLayout>
            </>
        );
    }
}