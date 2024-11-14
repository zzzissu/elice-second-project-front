import { Link } from "react-router-dom";
import ROUTE_LINK from "../../routes/RouterLink";

import { S } from "./Nav.style";

const Nav = () => {
  return (
    <S.Nav>
      <Link to={ROUTE_LINK.LIST.path}>
        <S.Logo>
          <S.LogoIcon />
          오래오래
        </S.Logo>
      </Link>
      <Link to={ROUTE_LINK.LOGIN.path}>
        <S.SignInBtn>로그인</S.SignInBtn>
      </Link>
    </S.Nav>
  );
};

export default Nav;
