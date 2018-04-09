import React from 'react';
import {
  Row,
  Col
} from 'antd';
import {
  Tabs,
  Carousel
} from 'antd';
import PCNewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_image_block';
const TabPane = Tabs.TabPane;

export default class PCNewsContainer extends React.Component {
  render() {
    const setting = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      autoplay: true
    };
    return (
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20} >
            <div class="container">

              <div class="centerImage">
                <div class="carousel">
                  <Carousel {...setting}>
                    <div><img src="./src/images/news_1.jpg"/></div>
                    <div><img src="./src/images/news_2.jpg"/></div>
                    <div><img src="./src/images/news_3.jpg"/></div>
                    <div><img src="./src/images/news_4.jpg"/></div>
                  </Carousel>
                </div>
              </div>

              <div class="leftContainer">
                <PCNewsImageBlock count={6} type="guoji" width="150px" cardTitle="国际头条" imageWidth="100px" border=""></PCNewsImageBlock>
              </div>

              <div class="tabs_news">
                <Tabs>
                  <TabPane tab="社会" key="1">
                      <PCNewsBlock count={5} type="shehui" width="100%" border="false"></PCNewsBlock>
                  </TabPane>
                  <TabPane tab="体育" key="2">
                      <PCNewsBlock count={5} type="tiyu" width="100%" border="false"></PCNewsBlock>
                  </TabPane>
                  <TabPane tab="科技" key="3">
                      <PCNewsBlock count={5} type="keji" width="100%" border="false"></PCNewsBlock>
                  </TabPane>
                </Tabs>
              </div>

              <div>
                <PCNewsImageBlock count={8} type="guonei" width="100%" cardTitle="国内头条" imageWidth="120px" border="true"></PCNewsImageBlock>
                <PCNewsImageBlock count={16} type="yule" width="100%" cardTitle="娱乐头条" imageWidth="120px" border="true"></PCNewsImageBlock>
              </div>

            </div>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    );
  };
}
