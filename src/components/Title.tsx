import { useRef } from "react";

const Title = ({ setTitle, mutate, note }) => {
  const textareaRef = useRef(null);

  const handleResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  return (
    <form>
      <textarea
        ref={textareaRef}
        onChange={(e) => {
          setTitle(e.target.value);
          handleResize();
          const handler = setTimeout(() => {
            mutate();
          }, 100);

          return () => {
            clearTimeout(handler);
          };
        }}
        type="textarea"
        placeholder="Untitled"
        className="w-full border-0 h-auto bg-background p-1 text-2xl md:text-4xl font-semibold focus:border-0 border-none outline-0 overflow-hidden"
        name="title"
        defaultValue={note?.title !== "" ? note?.title : ""}
        // rows={auto}
      />
    </form>
  );
};

export default Title;
