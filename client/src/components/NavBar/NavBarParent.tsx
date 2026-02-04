import NavBarBase from "./NavBarBase";
import { parentNavItems } from "./navItems";

type NavBarParentProps = {
  avatarUrl: string;
  parentName: string;
};

function NavBarParent({ avatarUrl, parentName }: NavBarParentProps) {
  return (
    <NavBarBase
      items={parentNavItems}
      avatarUrl={avatarUrl}
      displayName={parentName}
    />
  );
}

export default NavBarParent;
