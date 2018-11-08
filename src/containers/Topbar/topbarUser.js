import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popover from '../../components/uielements/popover';
import IntlMessages from '../../components/utility/intlMessages';
import authAction from '../../redux/auth/actions';
import appAction from '../../redux/app/actions';

const { logout } = authAction;
const { closeAll } = appAction;
class TopbarUser extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: false
    };
  }
  hide() {
    this.setState({ visible: false });
  }
  handleVisibleChange() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const content = (
      <a
          className="isoDropdownLink"
          onClick={() => {
            this.props.logout();
            this.props.closeAll();
            localStorage.clear()
          }}
        >
          <IntlMessages id="topbar.logout" />
        </a>
    );

    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        arrowPointAtCenter={true}
        placement="bottomLeft"
      >
        
    {localStorage.getItem('userName')}
        
      </Popover>
    );
  }
}
export default connect(null, { logout, closeAll })(TopbarUser);
