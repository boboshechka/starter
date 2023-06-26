import React, { Component, useEffect } from 'react';
import { Form, Avatar, Button, Input, DatePicker, Row, Col, message, Upload, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ROW_GUTTER } from 'constants/ThemeConstant';
import Flex from 'components/shared-components/Flex'
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const EditProfile = () => {

    const params = useParams()
    const propsUser = useLocation()
    const navigate = useNavigate()

    const [user, setUser] = useState({ ...propsUser.state.record, avatarUrl: '/img/avatars/thumb-6.jpg'})
    const [isLoading, setIsLoading] = useState(true)
    
    const avatarEndpoint = 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
    const onFinish = values => {
        const key = 'updatable';
        message.loading({ content: 'Updating...', key });
        setTimeout(() => {
            setUser({
                name: values.name,
                email: values.email,
                userName: values.userName,
                dateOfBirth: values.dateOfBirth,
                phoneNumber: values.phoneNumber,
                website: values.website,
                address: values.address,
                city: values.city,
                postcode: values.postcode,
            })
            message.success({ content: 'Done!', key, duration: 2 });
            setIsLoading(false)
            navigate('/app/dashboards/default')
        }, 2000);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const onUploadAavater = info => {
        const key = 'updatable';
        if (info.file.status === 'uploading') {
            message.loading({ content: 'Uploading...', key, duration: 1000 });
            return;
        }
        if (info.file.status === 'done') {
            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    avatarUrl: imageUrl,
                }),
            );
            message.success({ content: 'Uploaded!', key, duration: 1.5 });
        }
    };

    const onRemoveAvater = () => {
        setUser({
            avatarUrl: ''
        })
    }


    return (
        <>
            <Flex alignItems="center" mobileFlex={false} className="text-center text-md-left">
                <Avatar size={90} src={user.avatarUrl} icon={<UserOutlined />} />
                <div className="ml-3 mt-md-0 mt-3">
                    <Upload onChange={onUploadAavater} showUploadList={false} action={avatarEndpoint}>
                        <Button type="primary">Change Avatar</Button>
                    </Upload>
                    <Button className="ml-2" onClick={onRemoveAvater}>Remove</Button>
                </div>
            </Flex>
            <div className="mt-4">
                {isLoading ?
                    <Form
                        name="basicInformation"
                        layout="vertical"
                        initialValues={
                            {
                                'name': user.name,
                                'email': user.email,
                                'username': user.userName,
                                'phoneNumber': user.phone,
                                'website': user.website,
                                'address': user.address,
                                'city': user.city,
                            }
                        }
                        
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={16}>
                                <Row gutter={ROW_GUTTER}>
                                    <Col xs={24} sm={24} md={12}>
                                        <Form.Item
                                            label="Name"
                                            name="name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your name!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12}>
                                        <Form.Item
                                            label="Username"
                                            name="username"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your username!'
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12}>
                                        <Form.Item
                                            label="Email"
                                            name="email"
                                            rules={[{
                                                required: true,
                                                type: 'email',
                                                message: 'Please enter a valid email!'
                                            }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12}>
                                        <Form.Item
                                            label="Date of Birth"
                                            name="dateOfBirth"
                                        >
                                            <DatePicker className="w-100" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12}>
                                        <Form.Item
                                            label="Phone Number"
                                            name="phoneNumber"
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12}>
                                        <Form.Item
                                            label="Website"
                                            name="website"
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={24}>
                                        <Form.Item
                                            label="Address"
                                            name="address"
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12}>
                                        <Form.Item
                                            label="City"
                                            name="city"
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12}>
                                        <Form.Item
                                            label="Post code"
                                            name="postcode"
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Button type="primary" htmlType="submit">
                                    Save Change
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    :
                    <div className='spin-container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Spin size='large' />
                    </div>
                }

            </div>
        </>
    )
}

export default EditProfile