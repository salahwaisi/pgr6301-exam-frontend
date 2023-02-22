import { Card, Row, Col, Button, notification } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { API_ACTIVITIES_URL, API_EMPLOYEES_URL } from '../../routes.constants';
import userState from '../../user/userState';

//import './ActivityView.scss';

function ManagerActivityView() {
  const [user] = useRecoilState(userState);
  const [activities, setActivities] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  const fetchActivityList = () => {
    axios.get(API_ACTIVITIES_URL + user?._id).then((results: any) => {
      setActivities(results.data)
    });
  }

  const fetchEmployeeList = () => {
    axios.get(API_EMPLOYEES_URL).then((results: any) => {
      setEmployeeList(results.data)
    });
  }

  useEffect(() => {
      fetchEmployeeList();
      fetchActivityList();
      // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, []);

  const onAddMemberToActivitySubmit = (activityId: string) => {
    let selectedMemberOption: HTMLSelectElement | null = document.querySelector("#employee-list-" + activityId) as HTMLSelectElement | null;
    let selectedMemberId = selectedMemberOption?.selectedOptions[0].value

    const activity: any = activities.filter((e: any) => e._id === activityId)[0]; 
    if (activity.members.filter((e: any) => e.memberId === selectedMemberId).length > 0) {
        api.error({
          message: `Notification`,
          description: "Cannot add member as he/she is already added",
          placement: 'bottomLeft',
        })
    } else {
        axios.post(API_ACTIVITIES_URL + activityId + "/members", { memberId: selectedMemberId}).then((results: any) => {
          fetchActivityList();

          api.info({
            message: `Notification`,
            description: "Added member to the activity",
            placement: 'bottomLeft',
          });
        });
    }
  }

  const onRemoveMemberFromActivityClicked = (activityId: string, memberId: string) => {
    axios.delete(API_ACTIVITIES_URL + activityId + "/members/" + memberId).then((results: any) => {
      fetchActivityList();

      api.info({
        message: `Notification`,
        description: "Removed member from the activity",
        placement: 'bottomLeft',
      });
    });
  }

  const formattedActivities: any = [];
  let i = 0;
  activities.forEach((activity: any) => {
    let activityMembers: any = [];

    let ii: number = 0;
    activity.members.forEach((activityMember: any) => {
        let memberInfo: any = employeeList.filter((e: any) => e._id === activityMember.memberId)[0];

        activityMembers.push(<div key={ii}><Row>
            <Col span="6">{ memberInfo.firstName + " " + memberInfo.lastName }</Col>
            <Col span="6">{ activity.members[ii].hoursSpent } spent on this activity</Col>
            <Col span="12"><Button onClick={() => { onRemoveMemberFromActivityClicked(activity._id, activityMember.memberId) }} size="small">Remove</Button></Col>
            </Row></div>);

        ii++;
    });

    const formattedEmployeeList = (): any[] => {
        let options: any[] = [];

        let i: number = 0;
        employeeList.forEach((employee: any) => {
            options.push(<option key={i} value={ employee._id }>{ employee.firstName + " " + employee.lastName }</option>)

            i++;
        })

        return options;
    }

    formattedActivities.push(<div key={i}>
      <Card className="activity-item">
        <h2>{ activity.name }</h2>
        <h3>Members</h3>
        
        <div className="add-member-wrapper">
          <Row>
              <Col span="12">
                  <select id={"employee-list-" + activity._id }>
                      { formattedEmployeeList() }
                  </select>
              </Col>

              <Col>
                <Button size="small" onClick={ () => { onAddMemberToActivitySubmit(activity._id) } }>Add member</Button>
              </Col>
          </Row>
          <br />
        </div>
        {activityMembers}

      </Card>
      <br />
    </div>)

    i++;
  })
  
  return (
    <div>
      <h1>Activities</h1>
      {contextHolder}

      <div className="activity-wrapper">
        { formattedActivities }
      </div>
    </div>
  );
}

export default ManagerActivityView;
