import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';
import {authorsFormattedForDropdown} from '../../selectors/selectors';


export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false
    };
    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (this.props.course.id != nextProps.course.id){
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5){
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }
    this.setState({errors:errors});
    return formIsValid;
  }

  deleteCourse(course) {
    console.log('deleting ', course);
    this.props.actions
      .deleteCourse(course)
      .then(() => this.redirect('Course deleted'))
      .catch((error) => {
        toastr.error(error);
      });
  }

  saveCourse(event) {
    event.preventDefault();
    if (!this.courseFormIsValid()){
      return;
    }
    this.setState({saving: true});
    this.props.actions
      .saveCourse(this.state.course)
      .then(() => this.redirect('Course saved'))
      .catch((error) => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect(message){
    this.setState({saving: false});
    toastr.success(message);
    this.context.router.push('/courses');
  }

  render() {
    return (
        <CourseForm
          allAuthors={this.props.authors}
          onChange={this.updateCourseState}
          onSave={this.saveCourse}
          onDelete={this.deleteCourse}
          errors={this.state.errors}
          course={this.state.course}
          saving={this.state.saving}/>
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, courseId){
  const course = courses.filter(c => c.id === courseId);
  return course.length ? course[0] : null;
}

function mapStateToProps(state, ownProps) {
  let course = {
    id:        '',
    watchHref: '',
    title:     '',
    authorId:  '',
    length:    '',
    category:  ''
  };

  const courseId = ownProps.params.id;

  if (state.courses.length && courseId){
    course = getCourseById(state.courses, courseId);
  }

  return {
    course: course,
    authors: authorsFormattedForDropdown(state.authors)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
