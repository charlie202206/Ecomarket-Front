import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "배송정보 조회",
    href: "/deliveryInfo",
    // icon: "bi bi-bell",
  },
  {
    title: "배송주소 관리",
    href: "/deliveryAddress",
    // icon: "bi bi-patch-check",
  },
  // {
  //   title: "UpdateDeiveryAddress",
  //   href: "/updatedeliveryAddress",
  //   icon: "bi bi-hdd-stack",
  // },
  {
    title: "배송관리 (택배기사용)",
    href: "/deliveryManagement",
    // icon: "bi bi-card-text",
  },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
          <Button
            outline color="success"
            tag="a"
            target="_blank"
            className="mt-3"
            href="#"
          >
            Button (New Window)
          </Button>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
