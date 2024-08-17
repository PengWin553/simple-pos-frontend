import { LuHistory, LuHome, LuPackage, LuTags } from "react-icons/lu";
import { NavLink } from "react-router-dom";

interface SideBarIconProps {
  icon: React.ReactNode;
  text?: string;
}

const SideBar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-16 flex flex-col bg-white dark:bg-gray-900 shadow-lg">
      <NavLink to={"/"}>
        <SideBarIcon icon={<LuHome size={32} />} text="Home"/>
      </NavLink>
      <Divider />
      <NavLink to={"/products"}>
        <SideBarIcon icon={<LuPackage size={32} />} text="Products"/>
      </NavLink>
      <NavLink to={"/categories"}>
        <SideBarIcon icon={<LuTags size={32} />} text="Categories"/>
      </NavLink>
      <NavLink to={"/transactions"}>
        <SideBarIcon icon={<LuHistory size={32} />} text="Transactions"/>
      </NavLink>
    </div>
  );
};

const SideBarIcon: React.FC<SideBarIconProps> = ({
  icon,
  text,
}) => (
  <div className="relative flex items-center justify-center h-12 w-12 mt-2 mb-2 mx-auto bg-gray-400 hover:bg-green-600 dark:bg-gray-800 text-green-500 hover:text-white hover:rounded-xl rounded-3xl transition-all duration-300 ease-linear cursor-pointer shadow-lg group">
    {icon}
    <span className="absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md text-white bg-gray-900  text-xs font-bold  transition-all duration-100 scale-0 origin-left group-hover:scale-100">
      {text}
    </span>
  </div>
);

const Divider = () => (
  <hr
    className="bg-gray-200 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-full mx-2"
  />
);

export default SideBar;
