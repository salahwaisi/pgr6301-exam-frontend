import { Button, Card, Divider, notification } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import ManagerUserFormView from '../../components/UserForm';
import { API_EMPLOYEES_URL } from '../../routes.constants';
import userState from '../../user/userState';

function ManagerEmployeeView() {
  const [employeeList, setEmployeeList] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [userForEditing, setUserForEditing] = useState({});
  const [user] = useRecoilState(userState);
  const [api, contextHolder] = notification.useNotification();

  const fetchEmployeeList = () => {
    axios.get(API_EMPLOYEES_URL).then((results: any) => {
      setEmployeeList(results.data)
    });
  }

  useEffect(() => {
    fetchEmployeeList();
  }, []);

  const setShowEditFormVisible = (employeeId: string | null) => {
    setShowEditForm(true);
    setUserForEditing(employeeList.filter((e: any) => e["_id"] === employeeId)[0])
  }

  const showNotification = (notificationText: string) => {
    api.info({
      message: `Notification`,
      description: notificationText,
      placement: 'bottomLeft',
    });
  }

  const formattedEmployeeList: any = [];
  let i = 0;
  employeeList.forEach((employee: any) => {
    formattedEmployeeList.push(<div key={i}>
      <Card className="employee-item">
          <h2>{ employee.firstName + " " + employee.lastName }</h2>
          <Button onClick={() => setShowEditFormVisible(employee._id)}>Edit</Button>
      </Card>
      <br />
    </div>)

    i++;
  });
  
  return (
    <div>
      <h1>Employees</h1>
      {contextHolder}
      <Button onClick={() => { setShowEditFormVisible(null) }}>Create new employee</Button>
      <Divider />

      { showEditForm ? (<ManagerUserFormView showNotification={showNotification} user={userForEditing} fetchEmployeeList={fetchEmployeeList} setShowEditForm={setShowEditForm} />) : null }

      <div className="employee-wrapper">
        { formattedEmployeeList }
      </div>
    </div>
  );
}

export default ManagerEmployeeView;
