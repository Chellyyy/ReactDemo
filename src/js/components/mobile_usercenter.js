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
  Button,
  Card,
  notification
} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router-dom';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';

export default class MobileUserCenter extends React.Component {
  constructor(){
    super();
    this.state = {
      previewImage:'',
      previewVisible:false,
      usercollection:'',
      usercomments:''
    };
  };
  componentDidMount(){
    var myFetchOptions = {
      method:'GET'
    }
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid,myFetchOptions)
    .then(response=>response.json())
    .then(json=>{
      this.setState({usercollection:json});
    });
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid,myFetchOptions)
    .then(response=>response.json())
    .then(json=>{
      this.setState({usercomments:json});
    });
  }
  render(){
    const {usercollection} = this.state;
    const usercollectionList = usercollection.length ?
    usercollection.map((uc,index)=>(
      <Card key={index} title={uc.uniquekey} extra={<a href={`/details/${uc.uniquekey}`}>查看</a>}>
        <p>{uc.Title}</p>

      </Card>
    ))
    :
    '这里什么都没有';
    const {usercomments} = this.state;
    const usercommentsList = usercomments.length ?
    usercomments.map((comment,index)=>(
      <Card key={index} title={`评论时间：${comment.datetime}`} extra={<a href={`/details/${comment.uniquekey}`}>查看</a>}>
        <p>{comment.Comments}</p>
      </Card>
    ))
    :
    '这里什么都没有';
    return(
      <div>
        <MobileHeader></MobileHeader>
        <Row className="userContainer">
          <Col span={24}>
            <Tabs>
              <TabPane tab="头像设置" key="1">
                </TabPane>
                <TabPane tab="我的评论" key="2">
                  {usercommentsList}
                </TabPane>
                <TabPane tab="我的收藏" key="3">
                  {usercollectionList}
                </TabPane>
              </Tabs>
          </Col>
        </Row>
          <MobileFooter></MobileFooter>
        </div>
    );
  };
}
