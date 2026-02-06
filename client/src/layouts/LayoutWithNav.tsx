import { Outlet } from "react-router-dom";

function LayoutWithNav() {
  return (
    <>
      <div>
        {/* nav bar ici */}
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default LayoutWithNav;
