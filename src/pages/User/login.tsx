import { Button, Col, Form, Input, Row } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { API_USERS_URL } from '../../routes.constants';
import userState from '../../user/userState';
import './login.scss';

const UserLoginView = () => {
    const [, setUser] = useRecoilState(userState);
    const [showUserCredentialsFailed, setShowUserCredentialsFailed] = useState(false);
    const [userLoginFormData, setUserLoginFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const onSubmit = async () => {
        await axios.post(API_USERS_URL + "/login", userLoginFormData).then((results: any) => {
            setUser(results.data);

            if (results.data.accountType === "manager") {
                navigate("/manager")
            } else {
                navigate("/employee")
            }
        }).catch((results: any) => {
            setShowUserCredentialsFailed(true);
        });
    }

    return <>
        <div className="login-wrapper">
            <h1>Greetings!</h1>
            <p>To continue, please log in</p>
            <Form>
                <Row>
                    <Col span="24">
                        { showUserCredentialsFailed === true ? (
                            <div className="wrong-credentials-alert">Your credentials are wrong</div>
                        ) : null }
                        <Form.Item name="username" label="Email address">
                            <Input onChange={(element: any) => setUserLoginFormData({...userLoginFormData, email: element.target.value })} />
                        </Form.Item>

                        <Form.Item name="password" label="Password">
                        <Input type="password" onChange={(element: any) => setUserLoginFormData({...userLoginFormData, password: element.target.value })} />
                        </Form.Item>

                        <Form.Item name="username">
                            <Button onClick={ onSubmit }>Log in</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    </>
}

export default UserLoginView;