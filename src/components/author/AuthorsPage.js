import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import toastr from 'toastr';

import * as authorActions from '../../actions/authorActions';
import AuthorList from './AuthorList';


class AuthorsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      authors: Object.assign({}, this.props.authors),
      courses: Object.assign({}, this.props.courses)
    };
    this.redirectToAddAuthorPage = this.redirectToAddAuthorPage.bind(this);
    this.deleteAuthor = this.deleteAuthor.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  redirectToAddAuthorPage() {
    browserHistory.push('/author');
  }

  deleteAuthor(author) {
    this.setState({saving: true});
    if (authorHasCourses(this.props.courses, author)) {
      toastr.error('Author has courses!  Unable to delete.');
      return;
    }
    this.props.actions
      .deleteAuthor(author)
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

  render() {
    const {authors, courses} = this.props;

    return (
      <div>
        <h1>Authors</h1>
        <input type="submit"
               value="Add Author"
               className="btn btn-primary"
               onClick={this.redirectToAddAuthorPage}/>
        <AuthorList
          authors={authors} courses={courses} onDeleteAuthor={this.deleteAuthor}/>
      </div>
    );
  }
}

function authorHasCourses(courses, author){
  let count = courses.filter(course => course.authorId === author.id).length;
  return count > 0;
}

AuthorsPage.contextTypes = {
  router: PropTypes.object
};


// props validation methods
AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    authors:  state.authors,
    courses:  state.courses,
    onDelete: state.onDelete
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
