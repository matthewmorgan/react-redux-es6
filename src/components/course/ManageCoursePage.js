import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';


class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false
    };
    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
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

  saveCourse(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions
      .saveCourse(this.state.course)
      .then(() => this.redirect());
  }

  redirect(){
    this.setState({saving: false});
    this.context.router.push('/courses');
  }

  render() {
    return (
        <CourseForm
          allAuthors={this.props.authors}
          onChange={this.updateCourseState}
          onSave={this.saveCourse}
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
  const authorsFormattedForDropdown = state.authors.map(a => {
    return {
      value: a.id,
      text: `${a.firstName} ${a.lastName}`
    };
  });

  return {
    course: course,
    authors: authorsFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
