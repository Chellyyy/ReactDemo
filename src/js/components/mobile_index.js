import React from 'react';

import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import { Tabs, Carousel } from 'antd';
const TabPane = Tabs.TabPane;

import MobileList from './mobile_list';
export default class MobileIndex extends React.Component {
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
        <MobileHeader></MobileHeader>
        <div class="mobileContainer">
          <Tabs>
            <TabPane tab="头条" key="1">
            <div class="carousel">
              <Carousel {...setting}>
                <div><img src="./src/images/news_1.jpg"/></div>
                <div><img src="./src/images/news_2.jpg"/></div>
                <div><img src="./src/images/news_3.jpg"/></div>
                <div><img src="./src/images/news_4.jpg"/></div>
              </Carousel>
            </div>
              <MobileList count={20} type="top"></MobileList>
            </TabPane>
            <TabPane tab="社会" key="2">
              <MobileList count={20} type="shehui"></MobileList>
            </TabPane>
            <TabPane tab="国内" key="3">
              <MobileList count={20} type="guonei"></MobileList>
            </TabPane>
            <TabPane tab="国际" key="4">
              <MobileList count={20} type="guoji"></MobileList>
            </TabPane>
            <TabPane tab="娱乐" key="5">
              <MobileList count={20} type="yule"></MobileList>
            </TabPane>
          </Tabs>
        </div>
        <MobileFooter></MobileFooter>
      </div>
    );
  };
}
