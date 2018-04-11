import React from 'react';
import{Row, Col, BackTop} from 'antd';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsImageBlock from './pc_news_image_block';
import CommonComments from './common_comments'
export default class PCNewsDetails extends React.Component{
  constructor(){
    super();
    this.state = {
      newsItem:''
    };
  };
  componentWillMount(){
  };
  componentDidMount(){
    var myFetchOptions = {
      method:'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.match.params.uniquekey,myFetchOptions)
    .then(response => response.json())
    .then(json => {
      this.setState({
        newsItem:json
      });
      document.title = this.state.newsItem.title +"- S's News | React + ant design";
    });
  };

  createMarkup(){
    return{__html:this.state.newsItem.pagecontent};
  };

  render(){
    return(
      <div>
        <PCHeader></PCHeader>
        <Row>
          <Col span={2}></Col>
          <Col span={14} className="detailontainer">
            <div class="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
            <CommonComments uniquekey={this.props.match.params.uniquekey}></CommonComments>
          </Col>
          <Col span={6} className="detailRight"><PCNewsImageBlock count={6} type="guoji" width="150px" cardTitle="国际头条" imageWidth="100px" imageHeight="100px" border=""></PCNewsImageBlock></Col>
          <Col span={2}></Col>
        </Row>
        <PCFooter></PCFooter>
        <BackTop/>
      </div>
    );
  };
}
