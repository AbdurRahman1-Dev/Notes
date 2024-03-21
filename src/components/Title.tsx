const Title = ({ setTitle, mutate, note }) => {
  return (
    <form>
      <textarea
        onChange={(e) => {
          setTitle(e.target.value);
          const handler = setTimeout(() => {
            mutate();
          }, 100);

          return () => {
            clearTimeout(handler);
          };
        }}
        type="textarea"
        placeholder="Untitled"
        className="w-full border-0 h-full bg-background p-1 text-4xl font-semibold  focus:border-0 border-none outline-0 "
        name="title"
        defaultValue={note?.title !== "" ? note?.title : ""}
      />
    </form>
  );
};

export default Title;
