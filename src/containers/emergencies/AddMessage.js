import { connect } from 'react-redux';
import AddMessageComponent from '../../components/emergencies/AddMessageComponent';
import { addMessage } from '../../redux/sockets/actions';

const mapDispatchToProps = dispatch => ({
  dispatch: data => {
    dispatch(addMessage(data));
  }
});

export const AddMessage = connect(() => ({}), mapDispatchToProps)(AddMessageComponent);