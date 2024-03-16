import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";

const SidebarLeft = () => {
  return (
    <div className="flex flex-col h-screen  py-5 px-2 justify-between  rounded-md">
      <div>
        <ul>
          <li>
            <Popover placement="right">
              <PopoverTrigger>
                <Button>Open </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="px-1 py-2">
                  <div className="text-small font-bold">Popover Content</div>
                  <div className="text-tiny">This is the popover content</div>
                </div>
              </PopoverContent>
            </Popover>
          </li>
          <li>oion</li>
          <li>oion</li>
          <li>oion</li>
        </ul>
      </div>{" "}
      <div>
        <ul>
          <li>oion</li>
          <li>oion</li>
          <li>oion</li>
          <li>oion</li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarLeft;
