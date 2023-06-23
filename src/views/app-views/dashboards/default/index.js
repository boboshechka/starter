import { Card, Table, Tag, Tooltip, message, Button, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import UserView from './UserView';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';


export const DefaultDashboard = () => {
  const [dataFromJson, setDataFromJson] = useState(null)
  const [userProfileVisible, setUserProfileVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        console.log('usersss', users)
        setDataFromJson(users)

      })

  }, [])

  function showUserProfile(userInfo) {
    setUserProfileVisible(true)
    setSelectedUser(userInfo)
  }

  function closeUserProfile() {
    setUserProfileVisible(false)
    setSelectedUser(null)
  }

  function deleteUser(userId) {
    setDataFromJson(state => state.filter(item => item.id !== userId))
    message.success({ content: `Deleted user ${userId}`, duration: 2 });
  }
  const tableColumns = [
    {
      title: 'User',
      dataIndex: 'name',
      render: (_, record) => (
        <div className="d-flex">
          <AvatarStatus src={record.img} name={record.name} subTitle={record.email} />
        </div>
      ),
      sorter: {
        compare: (a, b) => {
          a = a.name.toLowerCase();
          b = b.name.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      render: phone => (
        <div>{phone}</div>
      ),
      sorter: {
        compare: (a, b) => a.phone.length - b.phone.length,
      },
    },
    {
      title: 'Website',
      dataIndex: 'website',
      render: website => (
        // <Tag className="text-capitalize" color={status === 'active' ? 'cyan' : 'red'}>{status}</Tag>
        <div>{website}</div>
      ),
      sorter: {
        compare: (a, b) => a.status.length - b.status.length,
      },
    },
    {
      title: '',
      dataIndex: 'actions',
      render: (_, elm) => (
        <div className="text-right d-flex justify-content-end">
          <Tooltip title="View">
            <Button type="primary" className="mr-2" icon={<EyeOutlined />} onClick={() => { showUserProfile(elm) }} size="small" />
          </Tooltip>
          <Tooltip title="Delete">
            <Button danger icon={<DeleteOutlined />} onClick={() => { deleteUser(elm.id) }} size="small" />
          </Tooltip>
        </div>
      )
    }
  ];

  return (
    <div>
      <Card>
        {dataFromJson && <Link to={`/app/dashboards/setting/${dataFromJson.id}`}>
          <div className="table-responsive">
            <Table columns={tableColumns} dataSource={dataFromJson} rowKey='id' />
          </div>
          {dataFromJson
            ?
            <UserView data={dataFromJson} visible={userProfileVisible} close={closeUserProfile} />
            :
            <div className='spin-container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Spin size='large' />
            </div>
          }
        </Link>
        }
      </Card>
    </div>
  )
}


export default DefaultDashboard;
