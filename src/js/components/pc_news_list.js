import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom'

export default class PCNewsList extends React.Component{
  constructor(){
    super();
    this.state = {
      news:''
    };
  };
  componentWillMount(){
    var myFetchOptions = {
      method: 'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="
    + this.props.type
    + "&count="
    + this.props.count,myFetchOptions)
    .then(response => response.json())
		.then(json => this.setState({
			news: json
		}));

    console.log("123");
  };
  componentDidMount(){
  }
  render(){
    const news_border = Boolean(this.props.border);
    const { news } = this.state;
    const newsList = news.length
    ?
    news.map((newsItem,index)=>(
      <li key={index}>

          {newsItem.title}

      </li>
    ))
    :
    '没有加载到任何新闻';
    return(
      <div class="topNewsList">
        <Card bordered={news_border}>
          <ul>
            {newsList}
          </ul>
        </Card>
      </div>
    );
  };
}
