import { useState } from "react";
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
  { id: "cameras", name: "카메라", icon: <FaCamera /> },
  { id: "mobile phones", name: "휴대폰", icon: <FaMobileAlt /> },
  { id: "typewriters", name: "타자기", icon: <FaKeyboard /> },
  { id: "display devices", name: "디스플레이", icon: <FaTv /> },
  { id: "audio devices", name: "오디오 기기", icon: <FaMusic /> },
];

interface CategoryProps {
  selectedCategory: string | null;
  setSelectedCategory: (value: string) => void;
}
const Sidebar = ({ selectedCategory, setSelectedCategory }: CategoryProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

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
