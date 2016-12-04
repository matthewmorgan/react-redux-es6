import React, {PropTypes} from 'react';
import {Link} from 'react-router';


const AuthorListRow = ({author, courses, onDeleteAuthor}) => {
  return (
      <tr>
        <td><Link to={'/author/' + author.id}>{author.id}</Link></td>
        <td><Link to={'/author/' + author.id}>{author.firstName} {author.lastName}</Link></td>
        <td><input type="submit" value="Delete" className="btn btn-primary" onClick={() => onDeleteAuthor(author)}></input></td>
      </tr>
    );
};

AuthorListRow.propTypes = {
  author: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  onDeleteAuthor: PropTypes.func.isRequired
};




export default AuthorListRow;
