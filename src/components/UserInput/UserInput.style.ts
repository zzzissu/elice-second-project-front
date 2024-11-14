import styled from "styled-components";

interface FocusProps {
  isFocused: boolean;
}

export const S = {
  InputWrap: styled.div<FocusProps>`
    display: flex;
    align-items: center;

    padding: 10px;

    width: 260px;
    height: 40px;

    border-radius: 5px;

    border: 1px solid
      ${(props) => {
        if (props.isFocused) {
          return props.theme.color.orange;
        } else return props.theme.color.lightGrey;
      }};
  `,
  InputBox: styled.input`
    outline: none;
    border: none;
  `,
};
