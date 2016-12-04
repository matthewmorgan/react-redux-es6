import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import toastr from 'toastr';

import * as authorActions from '../../actions/authorActions';


class AuthorListRow extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      author:  Object.assign({}, this.props.author),
      courses: Object.assign({}, this.props.courses),
      errors:  {},
      saving:  false
    };
    this.deleteAuthor = this.deleteAuthor.bind(this);
  }

  deleteAuthor(event) {
    this.setState({saving: true});
    console.log('Current state', this.state);
    let courses = Object.keys(this.state.courses).filter(course => course.authorId === this.state.author.id);

    if (courses.length > 0) {
      toastr.error('Author has courses!  Unable to delete.');
      return;
    }
    this.props.actions
      .deleteAuthor(this.state.author)
      .then(() => this.redirect('Author deleted'))
      .catch(error => {
        toastr.error(error);
      });
  }

  redirect(message) {
    this.setState({saving: false});
    toastr.success(message);
    this.context.router.push('/authors');
  }

  render(){
    return (
      <tr>
        <td><Link to={'/author/' + this.state.author.id}>{this.state.author.id}</Link></td>
        <td><Link to={'/author/' + this.state.author.id}>{this.state.author.firstName} {this.state.author.lastName}</Link></td>
        <td><input type="submit" value="Delete" className="btn btn-primary" onClick={this.deleteAuthor}></input></td>
      </tr>
    );
  }
}

AuthorListRow.contextTypes = {
  router: PropTypes.object
};


AuthorListRow.propTypes = {
  author: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    courses:  state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorListRow);
