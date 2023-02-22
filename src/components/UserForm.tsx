import { Button, Col, Form, Row, Select } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_DEPARTMENTS_URL, API_USERS_URL } from '../routes.constants';

function ManagerUserFormView(props: any) {
  const [departmentList, setDepartmentList] = useState([]);
  const [editForm, setEditForm] = useState({
    _id: (props.user && props.user._id) ? props.user._id : '',
    firstName: (props.user && props.user.firstName) ? props.user.firstName : '',
    lastName: (props.user && props.user.lastName) ? props.user.lastName : '',
    email: (props.user && props.user.email) ? props.user.email : '',
    password: (props.user && props.user.password) ? props.user.password : '',
    departments: (props.user && props.user.departments) ? props.user.departments : [],
    accountType: (props.user && props.user.accountType) ? props.user.accountType : 'employee'
  })

  const fetchDepartmentList = () => {
    axios.get(API_DEPARTMENTS_URL).then((results: any) => {
      setDepartmentList(results.data)
    });
  }

  useEffect(() => {
    fetchDepartmentList();
  }, []);

  const cancelEditForm = () => {
    props.setShowEditForm(false);
    setEditForm({
      _id: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      departments: [],
      accountType: props.user.accountType ? props.user.accountType : 'employee'
    });
  }

  const onSelectedDepartmentsChange = (values: any[]) => {
    let formattedValues: any = [];

    values.forEach((value: any) => {
        formattedValues.push({ departmentId: value})
    });
    setEditForm({...editForm, departments: formattedValues})
  }

  const onEditFormSave = () => {
    if (editForm._id !== null && editForm._id !== '' && typeof editForm._id != 'undefined') {
        axios.put(API_USERS_URL, editForm).then((results: any) => {
            props.showNotification("Successfully updated employee");
            props.setShowEditForm(false);
            props.fetchEmployeeList();
        })
    } else {
        axios.post(API_USERS_URL, editForm).then((results: any) => {
            props.showNotification("Successfully added employee");
            props.setShowEditForm(false);
            props.fetchEmployeeList();
        })
    }
    
  }

  const formattedDepartmentList: any = [];

  departmentList.forEach((element: any) => {
    formattedDepartmentList.push({ label: element.name, value: element._id });
  });
  
    return (
        <div>
            <Row>
                <Col span="8">First name</Col>
                <Col span="8">
                    <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={ editForm.firstName }
                    onChange={(element: any) => {
                        setEditForm({...editForm, firstName: element.target.value})
                    }} />
                </Col>
            </Row>

            <Row>
                <Col span="8">Last name</Col>
                <Col span="8">
                    <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={ editForm.lastName }
                    onChange={(element: any) => {
                        setEditForm({...editForm, lastName: element.target.value})
                    }} />
                </Col>
            </Row>

            <Row>
                <Col span="8">Email address</Col>
                <Col span="8">
                    <input
                    type="text"
                    name="email"
                    id="email"
                    value={ editForm.email }
                    onChange={(element: any) => {
                        setEditForm({...editForm, email: element.target.value})
                    }} />
                </Col>
            </Row>

            <Row>
                <Col span="8">Password</Col>
                <Col span="8">
                    <input
                    type="text"
                    name="password"
                    id="password"
                    value={ editForm.password }
                    onChange={(element: any) => {
                        setEditForm({...editForm, password: element.target.value})
                    }} />
                </Col>
            </Row>

            <Row>
                <Col span="8">Departments</Col>
                <Col span="8">
                    <Form.Item>
                        <Select
                            mode="multiple"
                            onChange={onSelectedDepartmentsChange}
                            placeholder="Please select departments"
                            defaultValue={props.user && props.user.departments.length > 0 ? 
                                props.user.departments.map((e: any) => { return e.departmentId}) : []}
                            options={formattedDepartmentList} />
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span="8">Account type</Col>
                <Col span="8">
                    <select onChange={(element: any) => { setEditForm({...editForm, accountType: element.target.value}); }}>
                        <option selected={ props.user && props.user.accountType === "employee" } value="employee">Employee</option>
                        <option selected={ props.user && props.user.accountType === "manager" } value="manager">Manager</option>
                    </select>
                </Col>
            </Row>
            <br />
            <Row>
                <Col span="12"><Button onClick={ cancelEditForm }>Cancel</Button></Col>
                <Col span="12">
                    <Button onClick={ onEditFormSave }>Save</Button>
                </Col>
            </Row>
        </div>
    );
}

export default ManagerUserFormView;
