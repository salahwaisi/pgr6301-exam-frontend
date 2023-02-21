import { Tabs, TabsProps } from 'antd';
import ManagerActivityView from './ActivityView';
import ManagerEmployeeView from './EmployeeView';

import './index.scss';

function ManagerIndexView() {
  const tabItems: TabsProps['items'] = [
    {
      key: 'activities',
      label: `Activities`,
      children: <ManagerActivityView />,
    },
    {
      key: 'employees',
      label: `Employees`,
      children: <ManagerEmployeeView />,
    }
  ];

  return (
    <div>
        <Tabs items={tabItems} />
    </div>
  );
}

export default ManagerIndexView;
