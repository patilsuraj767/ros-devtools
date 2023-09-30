import {
    Form,
    FormGroup,
    TextInput,
    ActionGroup,
    Button,
    Alert
} from '@patternfly/react-core';
import { useState } from 'react';

const LoginForm = () => {
    const [isLoginDisabled, setIsLoginDisabled] = useState(true)
    const loginClicked = () => {
        console.log("here")
        fetch('http://localhost:8080/query', {
            method: 'POST',
            body: JSON.stringify({
                'query': 'select count(*) from information_schema.tables'
            }),
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer sha256~sGm2UsujQ1ylSJVCTU1itF7uN1RAQbXBVMiAlR-enNQ',
                'X-Forwarded-User': 'postgres'
            }
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch((err) => {
                console.log(err.message);
            });
    }

    const onChangetoken = (e) => {
        let data = e.target.value;
        (data.length > 0) ? setIsLoginDisabled(false) : setIsLoginDisabled(true);

    }

    return (
        <>
            <Form>
                <Alert variant="danger" title="Invalid token" ouiaId="DangerAlert" timeout={2000} />
                <FormGroup label="OpenShift Token" isRequired fieldId="token">
                    <TextInput
                        id="token"
                        isRequired
                        type="text"
                        name="token"
                        // value={usernameValue}
                        onChange={onChangetoken}
                    />
                </FormGroup>
                <ActionGroup>
                    <Button isDisabled={isLoginDisabled} variant="primary" onClick={loginClicked}>Login</Button>
                </ActionGroup>
            </Form>
        </>
    )
}

export default LoginForm 