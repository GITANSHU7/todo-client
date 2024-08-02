
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useAuth } from "../context/AuthContext";

const NavigationBar = () => {
      const { userDetails } = useAuth();
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          ToDos
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">
              {" "}
              {userDetails?.data?.user?.name}
            </span>
            <span className="block truncate text-sm font-medium">
              {userDetails?.data?.user?.email}
            </span>
          </Dropdown.Header>

          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}

export default NavigationBar;