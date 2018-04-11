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
  notification,
  Upload
} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router-dom';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import PCHeader from './pc_header';
import PCFooter from './pc_footer';

export default class PCUserCenter extends React.Component {
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
    const props={
      action:'http://newsapi.gugujiankong.com/handler.ashx',
      headers:{
        "Access-Control-Allow-Origin":"*"
      },
      listType:'picture-card',
      defaultFileList:[
        {
          uid:-1,
          name:'xxx.png',
          state:'done',
          url:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
          thumbUrl:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
        }
      ],
      onPreview:(file)=>{
        this.setState({previewImage:file.url,previewVisible:true});
      }
    }
    const {usercollection} = this.state;
    const usercollectionList = usercollection.length ?
    usercollection.map((uc,index)=>(
      <Card key={index} title={uc.uniquekey} extra={<a target="_blank" href={`/details/${uc.uniquekey}`}>查看</a>}>
        <p>{uc.Title}</p>

      </Card>
    ))
    :
    '这里什么都没有';
    const {usercomments} = this.state;
    const usercommentsList = usercomments.length ?
    usercomments.map((comment,index)=>(
      <Card key={index} title={`评论时间：${comment.datetime}`} extra={<a target="_blank" href={`/details/${comment.uniquekey}`}>查看</a>}>
        <p>{comment.Comments}</p>
      </Card>
    ))
    :
    '这里什么都没有';
    return(
      <div>
        <PCHeader></PCHeader>
        <Row className="userContainer">
          <Col span={2}></Col>
          <Col span={20}>
            <Tabs tabPosition="left" >
              <TabPane tab="头像设置" key="1">
                <div class="clearfix">
                  <Upload {...props}>
                    <Icon type="plus"/>
                    <div className="ant-upload-text">上传照片</div>
                  </Upload>
                  <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="预览" src={this.state.previewImage} />
                  </Modal>
                </div>
              </TabPane>
              <TabPane tab="我的评论" key="2">
                <div class="comment">
                  <Row>
                    <Col span={24}>
                      {usercommentsList}
                    </Col>
                  </Row>
                </div>
              </TabPane>
              <TabPane tab="我的收藏" key="3">
                <div class="comment">
                  <Row>
                    <Col span={24}>
                      {usercollectionList}
                    </Col>
                  </Row>
                </div>
              </TabPane>
            </Tabs>
          </Col>
          <Col span={2}></Col>
        </Row>
        <PCFooter></PCFooter>
      </div>
    );
  };
}
