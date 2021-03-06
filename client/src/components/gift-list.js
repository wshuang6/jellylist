import React from 'react';
import { connect } from 'react-redux';
import { getUser, selectUpdateGift } from '../actions';
import AddGift from './add-gift';
import EditGift from './edit-gift';

export class GiftList extends React.Component {
  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.props.dispatch(getUser(userId)); //WH: don't think you get a lot by defining userId if you only call it once
  }
  onClick(index) {
    this.props.dispatch(selectUpdateGift(index));
  }
  render() {
    console.log(this.props);
    if (this.props.loading) {
      return <h1>Loading...</h1>; //WH: does this work? I thought you had to wrap all JSX in parentheses but maybe I'm wrong
    }
    let currentGifts;
    console.log(this.props.user.giftlist);
    if (this.props.user.giftlist) {
      currentGifts = this.props.user.giftlist.map(
        (item, index) => (
          <li key={index} className="items">
            {' '}
            {item.name}
            {' '}
            <span className="editBtn" onClick={this.onClick.bind(this, index)}>
              {' '}Edit{' '}
            </span>
          </li>
        ),
        // {giftlist}
      );
    }
    return (
      <div className="container">
        <h2 className="user-title">{this.props.user.user}</h2>
        <ul>
          {currentGifts}
        </ul>
        <AddGift userId={this.props.match.params.userId} />
        <EditGift index /> {/*WH: not sure what index does here - could be correct, just never seen this before.*/} 
      </div>
    );
  }
}

// const mapStateToProps = state => ({gifts: state.giftlist});
const mapStateToProps = function(state, prop) {
  return { user: state.user, loading: state.loading };
};

export default connect(mapStateToProps)(GiftList);
