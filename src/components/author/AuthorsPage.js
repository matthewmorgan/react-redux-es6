import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as authorActions from '../../actions/authorActions';
import {bindActionCreators} from 'redux';
import AuthorList from './AuthorList';
import {browserHistory} from 'react-router';


class AuthorsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      authors: Object.assign({}, this.props.authors)
    };
    this.redirectToAddAuthorPage = this.redirectToAddAuthorPage.bind(this);
  }

  redirectToAddAuthorPage() {
    browserHistory.push('/author');
  }


  render() {
    const {authors, onDelete} = this.props;

    return (
      <div>
        <h1>Authors</h1>
        <input type="submit"
               value="Add Author"
               className="btn btn-primary"
               onClick={this.redirectToAddAuthorPage}/>
        <AuthorList
          authors={authors} onDelete={onDelete}/>
      </div>
    );
  }
}


// props validation methods
AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    authors:  state.authors,
    onDelete: state.onDelete
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
