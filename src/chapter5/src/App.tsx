import { Text } from "./libs/Text";
import { Heading } from "./libs/Heading";
import { Button } from "./libs/Button";
import { TextArea } from "./libs/TextArea";

export const App = () => {
  return (
    <>
      <Text text="hello world!" />
      <Heading tag="h1">見出し</Heading>
      <Heading tag="h2">
        <span>hello world!!</span>
      </Heading>
      <Button
        onClick={() => console.log("clicked")}
        title="Button"
        type="primary"
        width={96}
      />
      <Button
        onClick={() => console.log("clicked")}
        title="Button"
        type="secondary"
      />
      <Button
        onClick={() => console.log("clicked")}
        title="Button"
        type="error"
      />
      <TextArea width={500} />
    </>
  );
};
