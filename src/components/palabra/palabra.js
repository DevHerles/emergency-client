import React from 'react';
import {selectActiveWord} from '../../store/palabra/reducer';
import {connect} from 'react-redux';

const Palabra = ({palabra}) => <div>
    {palabra}
  </div>

  const mapSateToProps = state => {
    return {
      palabra: selectActiveWord(state)
    }
  }
  export default connect(mapSateToProps)(Palabra);
