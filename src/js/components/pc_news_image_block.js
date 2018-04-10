import React from 'react';
import {
  Card
} from 'antd';
import {
  Link
} from 'react-router-dom'

export default class PCNewsImageBlock extends React.Component {
  constructor() {
    super();
    this.state = {
      news: ''
    };
  };
  componentWillMount() {
    var myFetchOptions = {
      method: 'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" +
        this.props.type +
        "&count=" +
        this.props.count, myFetchOptions)
      .then(response => response.json())
      .then(json => this.setState({
        news: json
      }));

  };
  componentDidMount() {
    console.log(this.props.border);
  }
  render() {
    const news_border = Boolean(this.props.border);
    const styleImage={
      display:"block",
      width:this.props.imageWidth,
      height:this.props.imageHeight
    };
    const styleH3={
      width:this.props.imageWidth,
      whiteSpace:"nowrap",
      overflow:"hidden",
      textOverflow:"ellipsis"
    };
    const { news } = this.state;
    const newsList = news.length ?
      news.map((newsItem, index) => (
        <div key={index} class="imageblock">
        {/*Link*/}
        <div class="custom-image">
          <img alt="" style={styleImage} src={newsItem.thumbnail_pic_s} />
        </div>
        <div class="custom-card">
          <h3 style={styleH3}>{newsItem.title}</h3>
          <p>{newsItem.author_name}</p>
        </div>
        {/*Link*/}
      </div>
      )) :
      '没有加载到任何新闻';
    return (
      <div class="topNewsList">
        <Card title={this.props.cardTitle} bordered={news_border} style={{width:this.props.width}}>
          {newsList}
        </Card>
      </div>
    );
  };
}
