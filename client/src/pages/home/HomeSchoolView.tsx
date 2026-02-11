import { Link } from "react-router-dom";

function HomeSchoolView() {
  return (
    <div>
      <h1>HomeSchoolView</h1>
      <Link to="/school/tickets">See school's tickets</Link>
    </div>
  );
}

export default HomeSchoolView;
