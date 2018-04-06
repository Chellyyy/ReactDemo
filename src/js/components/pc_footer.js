import React from 'react';
import {
  Row,
  Col
} from 'antd';
import { Menu, Icon } from 'antd';

export default class PCFooter extends React.Component {
  render() {
    return (
      <footer>
        <Row>
          <Col span={2}></Col>
          <Col span={20}>
            <span class="footer">
              &copy;&nbsp;2018 ReactNews. All Right Reserved.
            </span>
          </Col>
          <Col span={2}></Col>
        </Row>
      </footer>
    );
  };
}
