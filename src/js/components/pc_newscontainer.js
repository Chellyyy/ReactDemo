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
import PCNewsList from './pc_news_list';
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
                <PCNewsImageBlock count={6} type="guoji" width="150px" cardTitle="国际头条" imageWidth="100px" imageHeight="100px" border=""></PCNewsImageBlock>
              </div>

              <div class="centerContainer">
                <Tabs>
                  <TabPane tab="社会" key="1">
                      <PCNewsBlock count={12} type="shehui" width="100%" border=""></PCNewsBlock>
                  </TabPane>
                  <TabPane tab="体育" key="2">
                      <PCNewsBlock count={12} type="tiyu" width="100%" border=""></PCNewsBlock>
                  </TabPane>
                  <TabPane tab="科技" key="3">
                      <PCNewsBlock count={12} type="keji" width="100%" border=""></PCNewsBlock>
                  </TabPane>
                </Tabs>
              </div>

              <div class="rightContainer">
                <PCNewsImageBlock count={1} type="guonei" width="100%" cardTitle="国内头条" imageWidth="250px" imageHeight="150px" border=""></PCNewsImageBlock>
                <PCNewsList count={10} type="guonei" ></PCNewsList>
              </div>

            </div>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    );
  };
}
