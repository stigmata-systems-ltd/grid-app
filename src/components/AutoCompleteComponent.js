import React, { Component } from 'react';
import AutoComplete from 'react-native-autocomplete-select';

export default class AutoCompleteComponent extends Component{
  onSelect = (suggestion) => {
    console.log(suggestion);
  }
    render(){
        return(<AutoComplete
            onSelect={this.onSelect}
            suggestions={this.props.suggestions}
            suggestionObjectTextProperty='text'
            value='sug'
          />);
    }
}
