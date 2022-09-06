import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import { BiChevronRight, BiMenu, BiCartAlt } from "react-icons/bi";
import { FcInTransit } from "react-icons/fc";

// import { ReactComponent as LogoWhite } from "../assets/images/logos/xtremelogowhite.svg";
import user1 from "../img/users/user1.jpg";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  return (
    <Navbar color="dark" dark expand="md">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
          {/* <LogoWhite /> */}
        </NavbarBrand>
        <Button
          color="dark"
          className="d-lg-none"
          onClick={() => showMobilemenu()}
        >
          {/* <i className="bi bi-list"></i> */}
          <BiMenu/>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="dark"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link to="/ecoproductlist" className="nav-link">
              Home
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/disposal" className="nav-link">
              배출
            </Link>
          </NavItem>
          <UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav>
              Menu
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>

        <Link to={'/deliveryInfo'} ><FcInTransit/>    </Link>
        
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="dark">
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Info</DropdownItem>
            <DropdownItem><Link to={'/myPage/'+ 1} style={{ textDecoration: 'none', color: 'black'}}>My Page</Link></DropdownItem>
            {/* <Link to={'/myPage/'+ 1}><button>마이페이지</button></Link> */}
            <DropdownItem> <Link to={'/reviewList/'+ 2} style={{ textDecoration: 'none', color: 'black'}}>리뷰리스트 </Link> </DropdownItem>
            <DropdownItem><Link to={'/basketlist'} style={{ textDecoration: 'none', color: 'black'}}>Basketlist</Link></DropdownItem>
            <DropdownItem divider />
            {/* <DropdownItem></DropdownItem> */}
            {/* <DropdownItem>Inbox</DropdownItem> */}
            
            <DropdownItem>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
