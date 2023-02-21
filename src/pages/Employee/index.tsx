import { Button, Card, Col, Form, Input, notification, Row } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { API_ACTIVITIES_URL } from '../../routes.constants';
import userState from '../../user/userState';

//import './index.scss';

const EmployeeIndexView = () => {
  const [activities, setActivities] = useState([]);
  const [user] = useRecoilState(userState);
  const [api, contextHolder] = notification.useNotification();

  const fetchUserActivityList = () => {
    axios.get(API_ACTIVITIES_URL + user?._id).then((results: any) => {
      setActivities(results.data)
    });
  }

  useEffect(() => {
    fetchUserActivityList();
  }, []);

  const onHoursSpentSubmit = (activityId: string) => {
    let addedHours: HTMLInputElement | null = document.querySelector("#form-item-" + activityId) as HTMLInputElement | null;
    let addedHoursNumber: string = addedHours?.value ? addedHours?.value : '0';

    let remainingHoursAllocated = 0;

    activities.forEach((element: any) => {
      if (element._id === activityId) {
        remainingHoursAllocated = element.hoursAllocated - element.members.map((k: any) => k.hoursSpent).reduce((partialSum: any, a: any) => parseInt(partialSum) + parseInt(a), 0)
      }
    })

    if (parseInt(addedHoursNumber) <= remainingHoursAllocated) {
      axios.get(API_ACTIVITIES_URL + activityId + "/member/" + user?._id + "/allocate-hours/" + addedHoursNumber).then((results: any) => {
        // notify
        fetchUserActivityList();
      });
    } else {
      api.error({
        message: `Notification`,
        description: "This is too many hours, you cannot add more than " + remainingHoursAllocated,
        placement: 'bottomLeft',
      });
    }
  }
  
  const formattedActivities: any = [];
  let i = 0;
  activities.forEach((item: any) => {
    formattedActivities.push(<Card key={i} className="user-activity">
      <h2>{ item.name }</h2>
      <p>Total hours allocated: { item.hoursAllocated }.</p>
      <p>You have allocated { item.members.filter((obj: any) => {return obj.memberId === user?._id})[0].hoursSpent } hours and can add { (item.hoursAllocated - item.members.map((k: any) => k.hoursSpent).reduce((partialSum: any, a: any) => partialSum + a, 0)) } more hours.</p>

      <Form>
        <Row gutter={12}>
          <Col span="6">
            <Form.Item label="Allocate more hours" >
              <Input id={"form-item-" + item._id} />
            </Form.Item>
          </Col>

          <Col span="6">
            <Form.Item>
              <Button onClick={() => onHoursSpentSubmit(item._id) }>Submit</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>)

    i++;
  })

  return (
    <div>
      <h1>Your activities</h1>
      {contextHolder}

      <div className="activity-list">
        { formattedActivities }
      </div>
    </div>
  );
}

export default EmployeeIndexView;
