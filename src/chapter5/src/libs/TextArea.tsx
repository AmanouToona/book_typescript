import styled, { css } from "styled-components";
import { ChangeEvent, VFC, useState } from "react";
import { space, color, radius, fontSize } from "./constants/index";

type Props = {
  width?: number;
  maxLength?: number;
};

export const TextArea: VFC<Props> = ({ maxLength, width = 300 }) => {
  const [count, setCount] = useState<number>(0);
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCount(event.currentTarget.value.length);
    console.log(isError());
  };

  const isError = (): boolean => {
    if (maxLength !== undefined && maxLength - count < 0) return true;
    else return false;
  };

  return (
    <>
      <Wrapper onChange={handleChange} width={width} />;
      {maxLength !== undefined && (
        <Count className={isError() ? "error" : ""}>
          残り{Math.max(maxLength - count, 0)}文字です
        </Count>
      )}
    </>
  );
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
  &.error {
    color: ${color.red};
  }
`;

const Count = styled.p`
  margin: 0;
  font-size: ${fontSize.m};
`;
