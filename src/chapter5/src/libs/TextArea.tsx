import styled, { css } from "styled-components";
import { VFC, useState } from "react";
import { space, color, radius, fontSize } from "./constants/index";

type Props = {
  width?: number;
  maxLength?: number;
};

export const TextArea: VFC<Props> = ({ width = 300 }) => {
  const [count, setCount] = useState<number>(0);
  return <Wrapper width={width} />;
};

const Wrapper = styled.textarea<{ width: number }>`
  height: 120px;
  padding: ${space.m};
  border-radius: ${radius.m};
  border: solid 1px ${color.gray};
  font-size: ${fontSize.m};
  ${(props) =>
    css`
      width: ${props.width}px;
    `}
`;
