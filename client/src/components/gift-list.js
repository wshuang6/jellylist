import React from 'react';
import {connect} from 'react-redux';
import { getUser, selectUpdateGift } from '../actions';
import AddGift from './add-gift';
import EditGift from './edit-gift';



export class GiftList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const userId = this.props.match.params.userId;
    this.props.dispatch(getUser(userId));
  }
  onClick(index) {
    this.props.dispatch(selectUpdateGift(index));

  }
  render() {
    let currentGifts;
    console.log(this.props.user.giftlist);
    if(this.props.user.giftlist) {
      currentGifts = this.props.user.giftlist.map((item, index) => 
        <li key={index} className="items" > {item.name} <span className="editBtn" onClick={ this.onClick.bind(this, index)}> Edit </span></li>
        // {giftlist}
      )
    }
    return (
      <div className='container'>
        <h2 className='user-title'>{this.props.user.user}</h2>
        <ul>
          {currentGifts}
        </ul>
        <AddGift userId={this.props.match.params.userId}/>
        <EditGift index className='hidden'/>
      </div>
    );
  }
}

// const mapStateToProps = state => ({gifts: state.giftlist});
const mapStateToProps = function(state, prop){
  return {user: state.user};
}

export default connect(mapStateToProps)(GiftList)