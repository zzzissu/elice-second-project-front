import { Link, useLocation, useNavigate } from "react-router-dom";
import ROUTE_LINK from "../../routes/RouterLink";

import { S } from "./Nav.style";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const TOKEN = localStorage.getItem("token");

  const SignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const goToMypage = () => {
    navigate("/users/my");
  };

  const goToCart = () => {
    navigate("/cart");
  };

  console.log(TOKEN);
  console.log(location.pathname);
  return (
    <S.Nav>
      <Link to={ROUTE_LINK.LIST.path}>
        <S.Logo>
          <S.LogoIcon />
          오래오래
        </S.Logo>
      </Link>
      {TOKEN === null ? (
        <Link to={ROUTE_LINK.LOGIN.path}>
          <S.NavBtn>로그인</S.NavBtn>
        </Link>
      ) : (
        <S.UserBox>
          <S.UserIcon
            onClick={goToMypage}
            location={location.pathname}
          ></S.UserIcon>
          <S.CartIcon
            onClick={goToCart}
            location={location.pathname}
          ></S.CartIcon>
          <S.NavBtn onClick={SignOut}>로그아웃</S.NavBtn>
        </S.UserBox>
      )}
    </S.Nav>
  );
};

export default Nav;
