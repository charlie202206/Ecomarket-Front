import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation, } from "react-router-dom";
import Logo from "./Logo";
import { BiChevronRight, BiMenu } from "react-icons/bi";

const navigation = [
  {
    title: "상품검색",
    href: "/ecoproductsearch",
    // icon: "bi bi-bell",
  },
  {
    title: "상품목록 조회",
    href: "/ecoproductlist",
    // icon: "bi bi-bell",
  },
  {
    title: "상품등록 (기업회원용)",
    href: "/ecoproductcreate",
    // icon: "bi bi-bell",
  },
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
    icon: "FcInTransit",
  },
  {
    title: "EcoPointStandard",
    href: "/ecoPointStandard",
    // icon: "bi bi-patch-check",
  },
  {
    title: "Disposal",
    href: "/disposal",
    // icon: "bi bi-patch-check",
  },
  {
    title: "Basket",
    href: "/basket",
    // icon: "bi bi-patch-check",
  },
  {
    title: "Ecoorderlist",
    href: "/ecoorderlist",
    // icon: "bi bi-patch-check",
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
        <Logo />
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
      </div>
      <div className="pt-4 mt-2" >
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
                {/* <i className={navi.icon}></i> */}
                <BiChevronRight/>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
          {/* <Button
            outline color="success"
            tag="a"
            target="_blank"
            className="mt-3"
            href="#"
          >
            Button (New Window)
          </Button> */}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
