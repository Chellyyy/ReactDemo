import React from 'react';

import {
  Row,
  Col
} from 'antd';
import logo from '../../images/logo.png';
import {
  Menu,
  Icon,
  Tabs,
  message,
  Form,
  Input,
  CheckBox,
  Modal,
  Button
} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router-dom';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class PCHeader extends React.Component {
    constructor() {
      super();
      this.state = {
        current: 'top',
        modalVisible: false,
        action: "login",
        hasLogined: false,
        userNickName: "",
        userid: 0
      };
    };
    componentWillMount() {
      if (localStorage.userid != '') {
  			this.setState({
  				hasLogined: true,
  			});
  			this.setState({
  				userNickName: localStorage.userNickName,
  				userid: localStorage.userid
  			});
  		}
  	};
    setModalVisible(value) {
      this.setState({
        modalVisible: value
      });
    };
    handleClick(e) {
      if (e.key == "register") {
        this.setState({
          current: "register"
        });
        this.setModalVisible(true);
      } else {

          this.setState({
            current: e.key
          });

      }
    };
    handleSubmit(e) {
      //页面向API提交数据
      e.preventDefault();
      var myFetchOptions = {
        method: 'GET'
      };
      var formData = this.props.form.getFieldsValue();
      console.log(formData);
      fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
      + "&username=" + formData.userName + "&password=" + formData.password
      + "&r_userName=" + formData.r_userName + "&r_password="
      + formData.r_password + "&r_confirmPassword="
      + formData.r_confirmPassword, myFetchOptions).
      then(response => response.json()).then(json => {
        this.setState({
          userNickName: json.NickUserName,
          userid: json.UserId
        });
        localStorage.userid = json.UserId;
        localStorage.userNickName = json.NickUserName;
      });
      if (this.state.action == "login") {
        this.setState({
          hasLogined: true
        });
      }
      message.success("请求成功！");
      this.setModalVisible(false);
    };
    callback(key) {
      if (key == 1) {
        this.setState({
          action: "login"
        });
      } else if (key == 2) {
        this.setState({
          action: "register"
        });
      }
    };
    logout() {
      localStorage.userid = '';
      localStorage.userNickName = '';
      this.setState({
        hasLogined: false
      });
    };
  render() {
    const login_style={
      float:"right"
    };
    let { getFieldDecorator } = this.props.form;
    const userShow = this.state.hasLogined
    ?
    <Menu.Item key="logout" style={login_style}>
      <div class="register">
        <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
        &nbsp;&nbsp;
        <Button type="dashed" htmlType="button">个人中心</Button>
        &nbsp;&nbsp;
        <Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
      </div>
    </Menu.Item>
    :
    <Menu.Item key="register" style={login_style}>
      <div class="register">
        注册/登录
      </div>
    </Menu.Item>;
    return (
      <header>
        <Row>
          <Col span={2}></Col>
          <Col span={4}>
            <a href="/" class="logo">
              <img src={logo} alt="logo"/>
              <span>ReactNews</span>
            </a>
          </Col>
          <Col span={16}>
            <Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
              <Menu.Item key="top">
                头条
              </Menu.Item>
              <Menu.Item key="shehui">
                社会
              </Menu.Item>
              <Menu.Item key="guonei">
                国内
              </Menu.Item>
              <Menu.Item key="guoji">
                国际
              </Menu.Item>
              <Menu.Item key="yule">
                娱乐
              </Menu.Item>
              <Menu.Item key="tiyu">
                体育
              </Menu.Item>
              <Menu.Item key="keji">
                科技
              </Menu.Item>
              <Menu.Item key="shishang">
                时尚
              </Menu.Item>
              {userShow}
            </Menu>

<Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible}
onCancel = {()=>this.setModalVisible(false)}
onOk={()=>this.setModalVisible(false)} okText = "关闭">
  <Tabs type="card" onChange={this.callback.bind(this)}>
    <TabPane tab="登录" key="1">
      <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
        <FormItem label="账户">
          {getFieldDecorator('userName')(<Input placeholer="请输入您的账号"/>)}
        </FormItem>
        <FormItem label="密码">
          {getFieldDecorator('password')(<Input placeholer="请输入您的密码"/>)}
        </FormItem>
        <Button type="primary" htmlType="submit">登录</Button>
      </Form>
    </TabPane>
    <TabPane tab="注册" key="2">
      <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
        <FormItem label="账户">
          {getFieldDecorator('r_userName')(<Input placeholer="请输入您的账号"/>)}
        </FormItem>
        <FormItem label="密码">
          {getFieldDecorator('r_password')(<Input placeholer="请输入您的密码"/>)}
        </FormItem>
        <FormItem label="确认密码">
          {getFieldDecorator('r_confirmPasswordpassword')(<Input placeholer="请再次输入您的密码"/>)}
        </FormItem>
        <Button type="primary" htmlType="submit">注册</Button>
      </Form>
    </TabPane>

  </Tabs>
</Modal>

          </Col>
          <Col span={2}></Col>
        </Row>
      </header>
    );
  };
}

export default PCHeader = Form.create({})(PCHeader);
