import  { useState } from 'react';
// import { AppstoreOutlined, MailOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

// const items = [
//   {
//     label: 'Navigation One',
//     key: 'mail',
//     // icon: <MailOutlined />,
    
//   },
//   {
//     label: 'blog',
//     key: '/blog',
//     // icon: <MailOutlined />,
//   },
  
  // {
  //   label: 'Navigation Two',
  //   key: 'app',
  //   icon: <AppstoreOutlined />,
  //   disabled: true,
  // },

// ];
const Navbar = () => {
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" theme="dark">
        <Menu.Item>
            <span>Home</span>
            <Link to="/" />
         </Menu.Item>
         <Menu.Item>
            <span>blog</span>
            <Link to="/blog" />
         </Menu.Item>
        </Menu>
    </>
  )
};
export default Navbar;