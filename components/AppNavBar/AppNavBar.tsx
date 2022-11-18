import Link from "next/link";
import style from "./AppNavBar.module.css";

type AppLink = {
  path: string;
  label: string;
};

interface AppNavBarProps {
  links: AppLink[];
  className?: string;
}

const AppNavBar = ({ className, links }: AppNavBarProps) => {
  return (
    <nav className={`${style.navBar} ${className}`}>
      {links.map((link) => (
        <Link key={link.path} href={link.path}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default AppNavBar;
