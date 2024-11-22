import * as S from "./Sidebar.styled";
import {
  FaCamera,
  FaMobileAlt,
  FaKeyboard,
  FaTv,
  FaMusic,
} from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

const categories = [
  { id: "camera", name: "카메라", icon: <FaCamera /> },
  { id: "phone", name: "휴대폰", icon: <FaMobileAlt /> },
  { id: "typewriter", name: "타자기", icon: <FaKeyboard /> },
  { id: "display", name: "디스플레이", icon: <FaTv /> },
  { id: "audio", name: "오디오 기기", icon: <FaMusic /> },
];

interface CategoryProps {
  selectedCategory: string | null;
  setSelectedCategory: (value: string) => void;
}
const Sidebar = ({ selectedCategory, setSelectedCategory }: CategoryProps) => {
  const [, setSearchParams] = useSearchParams();

  const handleCategoryClick = (id: string) => {
    setSelectedCategory(id);
    setSearchParams({ categoryName: id });
  };

  return (
    <S.SidebarContainer>
      {categories.map((category) => (
        <S.CategoryButton
          key={category.id}
          isSelected={selectedCategory === category.id}
          onClick={() => handleCategoryClick(category.id)}
        >
          {category.icon}
          <S.CategoryName>{category.name}</S.CategoryName>
        </S.CategoryButton>
      ))}
    </S.SidebarContainer>
  );
};

export default Sidebar;
