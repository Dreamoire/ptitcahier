import NavBarBase from "./NavBarBase";
import { schoolNavItems } from "./navItems";

type NavBarSchoolProps = {
  logoUrl: string;
  schoolName: string;
};

function NavBarSchool({ logoUrl, schoolName }: NavBarSchoolProps) {
  return (
    <NavBarBase
      items={schoolNavItems}
      avatarUrl={logoUrl}
      displayName={schoolName}
    />
  );
}

export default NavBarSchool;
