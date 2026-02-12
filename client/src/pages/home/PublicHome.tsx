import { Link } from "react-router";

function PublicHome() {
  return (
    <>
      <div>PublicHome</div>
      <Link to="/login">LOGIN</Link>
      <Link to="/register">REGISTER SCHOOL</Link>
    </>
  );
}

export default PublicHome;
