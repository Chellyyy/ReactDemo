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

class CommonComments extends React.Component {
  constructor(){
    super();
    this.state = {
      comments:''
    };
  };
  componentDidMount(){
    var myFetchOptions = {
      method:'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey,myFetchOptions)
    .then(response => response.json())
    .then(json => {
      this.setState({
        comments:json
      });
    });
  };
  handleSubmit(e){
    e.preventDefault();
    var myFetchOptions = {
      method:'GET'
    };
    var formdata = this.props.form.getFieldsValue();
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid="+localStorage.userid+"&uniquekey="+this.props.uniquekey+"&commnet="+formdata.remark,myFetchOptions)
    .then(response => response.json())
    .then(json => {
      this.componentDidMount();
    });
  };
  addUserCollection(){
    var myFetchOptions = {
      method:'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid="+localStorage.userid+"&uniquekey="+this.props.uniquekey,myFetchOptions)
    .then(response => response.json())
    .then(json => {
      //收藏成功后进行全局提醒
      notification['success']({message:'提醒',description:'收藏成功'});
    });
  };
  render(){
    let { getFieldDecorator } = this.props.form;
    const {comments} = this.state;
    const commentList = comments.length ?
    comments.map((comment,index) =>(
      <Card key={index} title={comment.UserName} extra={<a href="#">发表于 {comment.datetime}</a>}>
        <p>{comment.Comments}</p>
      </Card>
    ))
    :
    '没有加载到任何评论';
    return(
      <div class="comment">
        <Row>
          <Col span={24}>
          {commentList}
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <FormItem label="您的评论">
                {getFieldDecorator('remark')(<Input type="textarea" placeholder="随便写"/>)}
                {/*<input type="textarea" placeholer="随便写" {...getFieldProps('remark',{initalValue:''})}/>*/}
                <Button type="primary" htmlType="submit">发表评论</Button>
                &nbsp;&nbsp;
                <Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏该文章</Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}
export default CommonComments = Form.create({})(CommonComments);
