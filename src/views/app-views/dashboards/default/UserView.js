import { Avatar, Drawer, Divider } from 'antd';
import {
    MobileOutlined,
    MailOutlined,
    UserOutlined,
    CalendarOutlined,
    FacebookOutlined,
    InstagramOutlined,
    TwitterOutlined,
} from '@ant-design/icons';

import { Link } from 'react-router-dom';


const UserView = ({ data, visible, close }) => {
    // <Link to={`/app/dashboards/setting/${data.id}`}>

    return (
        <Drawer
            width={300}
            placement="right"
            onClose={close}
            closable={false}
            open={visible}

        >
            <div className="text-center mt-3">
                <Link to={`/app/dashboards/setting/${data.id}`}>
                    <Avatar size={80} src={data?.img} />
                    <h3 className="mt-2 mb-0">{data.name ? data.name : 'Не вставляются данные'}</h3>
                    <span className="text-muted">{data.username}</span>
                </Link>
            </div>
            <Divider dashed />
            <div className="">
                <h6 className="text-muted text-uppercase mb-3">Account details</h6>
                <p>
                    <UserOutlined />
                    <span className="ml-3 text-dark">id: {data.id}</span>
                </p>
                <p>
                    <CalendarOutlined />
                    <span className="ml-3 text-dark">Born in {data.email}</span>
                </p>
            </div>
            <div className="mt-5">
                <h6 className="text-muted text-uppercase mb-3">CONTACT</h6>
                <p>
                    <MobileOutlined />
                    <span className="ml-3 text-dark">{data?.phone}</span>
                </p>
                <p>
                    <MailOutlined />
                    <span className="ml-3 text-dark">{data?.email ? data?.email : '-'}</span>
                </p>
            </div>
            <div className="mt-5">
                <h6 className="text-muted text-uppercase mb-3">Social profiles</h6>
                <p>
                    <InstagramOutlined />
                    <a href="/#" className="ml-3 text-dark">{data?.company ? data?.company : '-'}</a>
                </p>
            </div>
        </Drawer>
    )
}

export default UserView