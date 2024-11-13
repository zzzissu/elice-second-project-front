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
      <S.SignInBtn>회원가입</S.SignInBtn>
    </S.Nav>
  );
};

export default Nav;
