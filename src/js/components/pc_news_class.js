import React from 'react';
import{Row, Col, BackTop} from 'antd';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsImageBlock from './pc_news_image_block';
import CommonComments from './common_comments';
import { Link } from 'react-router-dom';
export default class PCNewsClass extends React.Component{
  constructor(){
    super();
    this.state = {
      news:''
    };
  };
  componentWillMount(){
  };
  componentDidUpdate(){
    var myFetchOptions = {
      method: 'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="
    + this.props.match.params.type
    + "&count="
    + this.props.match.params.count,myFetchOptions)
    .then(response => response.json())
    .then(json => this.setState({
      news: json
    }));
  };
  componentWillMount(){
    var myFetchOptions = {
      method: 'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="
    + this.props.match.params.type
    + "&count="
    + this.props.match.params.count,myFetchOptions)
    .then(response => response.json())
    .then(json => this.setState({
      news: json
    }));
  };
  render(){
    const { news } = this.state;
    const newsList = news.length
    ?
    news.map((newsItem,index)=>(
      <section key={index} className="m_article list-item special_section clearfix">
        <Link to={`../../details/${newsItem.uniquekey}`} target="_blank">
          <div className="m_article_img">
            <img src={newsItem.thumbnail_pic_s} alt={newsItem.title}/>
          </div>
          <div className="m_article_info">
            <div className="m_article_title">
              <span>{newsItem.title}</span>
            </div>
            <div className="m_article_desc clearfix">
              <div className="m_article_desc_l">
                <span className="m_article_channel">{newsItem.realtype}</span>
                <span className="m_article_time">{newsItem.date}</span>
              </div>
            </div>
          </div>
        </Link>
      </section>
    ))
    :
    '没有加载到任何新闻';
    return(
      <div>
        <PCHeader type={this.props.match.params.type}></PCHeader>
        <Row>
          <Col span={2}></Col>
          <Col span={20} className="pc-news-class">
            {newsList}
          </Col>
          <Col span={2}></Col>
        </Row>
        <PCFooter></PCFooter>
        <BackTop/>
      </div>
    );
  };
}
