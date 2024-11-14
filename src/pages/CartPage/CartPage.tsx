import React, { useState } from "react";
import Checkbox from "../../components/Checkbox/Checkbox";

export default function CartPage() {
  const [isChecked, setIsChecked] = useState(false);
  const toggleCheckbox = () => {
    setIsChecked((prev) => !prev);
  };
  return <Checkbox checked={isChecked} onChange={toggleCheckbox} />;
}
