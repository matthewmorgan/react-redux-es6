import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorForm from './AuthorForm';
import toastr from 'toastr';


export class ManageAuthorPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      author: Object.assign({}, this.props.author),
      errors: {},
      saving: false
    };
    this.updateAuthorState = this.updateAuthorState.bind(this);
    this.saveAuthor = this.saveAuthor.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (this.props.author.id != nextProps.author.id){
      this.setState({author: Object.assign({}, nextProps.author)});
    }
  }

  updateAuthorState(event) {
    const field = event.target.name;
    let author = this.state.author;
    author[field] = event.target.value;
    return this.setState({author: author});
  }

  authorFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.author.firstName.length < 5){
      errors.firstName = 'Name must be at least 5 characters.';
      formIsValid = false;
    }
    this.setState({errors:errors});
    return formIsValid;
  }

  saveAuthor(event) {
    event.preventDefault();
    if (!this.authorFormIsValid()){
      return;
    }
    this.setState({saving: true});
    this.props.actions
      .saveAuthor(this.state.author)
      .then(() => this.redirect())
      .catch((error) => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect(){
    this.setState({saving: false});
    toastr.success('Author saved');
    this.context.router.push('/authors');
  }

  render() {
    return (
      <AuthorForm
        allAuthors={this.props.authors}
        onChange={this.updateAuthorState}
        onSave={this.saveAuthor}
        errors={this.state.errors}
        author={this.state.author}
        saving={this.state.saving}/>
    );
  }
}

ManageAuthorPage.propTypes = {
  author:  PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageAuthorPage.contextTypes = {
  router: PropTypes.object
};

function getAuthorById(authors, authorId){
  const author = authors.filter(a => a.id === authorId);
  return author.length ? author[0] : null;
}

function mapStateToProps(state, ownProps) {
  let author = {
    id:        '',
    watchHref: '',
    firstName: '',
    lastName: ''
  };

  const authorId = ownProps.params.id;

  if (state.authors.length && authorId){
    author = getAuthorById(state.authors, authorId);
  }

  return {
    author: author,
    authors: state.authors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);
