import {Component, MouseEvent} from "react";
import {BaseLayout} from "../components/BaseLayout";
import axios from "axios";
import {Alert, Button, Input} from "antd";

export class GetSecret extends Component {
    state = {
        hash: '',
        showAlert: false,
        alertType: undefined,
        alertMessage: '',
        alertDescription: ''
    };

    onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ showAlert: false });
        this.setState({ hash: e.currentTarget.value });
    };

    getSecret = ((hash: string) => {
        return axios.get('http://backend.secret.local/v1/secret/' + hash).then((result) => {
            this.setState({ alertMessage: 'Success' });
            this.setState({ alertDescription: 'Your secret is: ' + result.data.secretText });
            this.setState({ alertType: 'success' });
            this.setState({ showAlert: true });
        }).catch(() => {
            this.setState({ alertMessage: 'Error' });
            this.setState({ alertDescription: 'Secret not found' });
            this.setState({ alertType: 'error' });
            this.setState({ showAlert: true });
        })
    })

    render() {
        return (
            <>
                <BaseLayout>
                    <div className='getSecretContainer'>
                        <h1>Please type a secret hash</h1>
                        <Input placeholder="Your secret hash" value={this.state.hash} onChange={this.onChange}></Input>
                        <Button className='getSecretButton' onClick={async () => {
                            await this.getSecret(this.state.hash)
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