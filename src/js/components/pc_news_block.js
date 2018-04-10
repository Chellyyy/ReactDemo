import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom'

export default class PCNewsBlock extends React.Component{
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
    const styleImage={
      display:"inline",
      width:this.props.imageWidth,
      height:"100px"
    };
    const styleH3={
      width:this.props.imageWidth,
      whiteSpace:"nowrap",
      overflow:"hidden",
      textOverflow:"ellipsis",
      fontSize:"20px"
    };
    const { news } = this.state;
    const newsList = news.length
    ?
    news.map((newsItem,index)=>(
      <li key={index}>
            <span class="newsBlock-image">
              <img alt="" style={styleImage} src={newsItem.thumbnail_pic_s} />
            </span>
            <div class="newsBlock-card">
              <h3 style={styleH3}>{newsItem.title}</h3><br/><br/>
              <p>{newsItem.author_name}</p>
            </div>
      </li>
    ))
    :
    '没有加载到任何新闻';
    return(
      <div class="newsBlock">
        <Card  bordered={news_border}>
          <ul>
            {newsList}
          </ul>
        </Card>
      </div>
    );
  };
}
