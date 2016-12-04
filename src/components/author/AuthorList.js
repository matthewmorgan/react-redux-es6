import React, {PropTypes} from 'react';

import AuthorListRow from './AuthorListRow';


const AuthorList = ({authors, courses, onDeleteAuthor}) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Name</th>
      </tr>
      </thead>
      <tbody>
      {authors.map(author =>
        <AuthorListRow key={author.id} courses={courses} author={author} onDeleteAuthor={onDeleteAuthor}/>
      )}
      </tbody>
    </table>
  );
};

AuthorList.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  onDeleteAuthor: PropTypes.func.isRequired
};


export default AuthorList;
