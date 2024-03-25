import { Input } from "@nextui-org/react";
import { useRef, useState } from "react";

const Title = ({ setTitle, mutate, note }) => {
  const textareaRef = useRef(null);
  const [isDefault, setIsDefault] = useState(false);

  const handleResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  return (
    <form>
      {isDefault ? (
        <textarea
          ref={textareaRef}
          onChange={(e) => {
            setTitle(e.target.value);
            handleResize();
            const handler = setTimeout(() => {
              mutate();
            }, 1000);

            return () => {
              clearTimeout(handler);
            };
          }}
          type="textarea"
          placeholder="Untitled"
          className="w-full border-0 h-auto bg-background p-1 text-2xl md:text-4xl font-semibold focus:border-0 border-none outline-0 overflow-hidden"
          name="title"
          defaultValue={note?.title}
        />
      ) : (
        <textarea
          onFocus={() => setIsDefault(!isDefault)}
          ref={textareaRef}
          onChange={(e) => {
            setTitle(e.target.value);
            handleResize();
            const handler = setTimeout(() => {
              mutate();
            }, 1000);

            return () => {
              clearTimeout(handler);
            };
          }}
          type="text"
          placeholder="Untitled"
          className="w-full border-0 h-auto bg-background p-1 text-2xl md:text-4xl font-semibold focus:border-0 border-none outline-0 overflow-hidden"
          name="title"
          value={note?.title}
        />
      )}
    </form>
  );
};

export default Title;
