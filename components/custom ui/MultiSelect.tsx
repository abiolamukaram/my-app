"use client";

import {
  Command,
  // CommandDialog,
  // CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  // CommandList,
  // CommandSeparator,
  // CommandShortcut,
} from "@/components/ui/command";
import { useState } from "react";

import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface CollectionType {
  _id: string;
  title: string;
}

interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  collections,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  let selected: CollectionType[]

  if (value.length === 0) {
    selected = []
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    selected = value
    .map((id) => collections.find((collection) => collection._id === id))
    .filter((collection): collection is CollectionType => collection !== undefined);
 
  }

  // To remove or filter out the selected from the list
  const selectables = collections.filter((collection) => !selected.includes(collection));

  return (
    <Command className="overflow-visible bg-white">
      <div className="flex gap-1 flex-wrap border rounded-md">
          {selected.map((collection) => (
            <Badge key={collection._id}>{collection.title}
            <button className="ml-1 hover:text-red-1" onClick={() => onRemove(collection._id)}>
              <X className="h-3 w-3"/>
            </button>
            </Badge>
          ))}
        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
        />
      </div>

      <div className="relative mt-2">
        {open && (
          <CommandGroup className="absolute w-full z-10 top-0 overflow-auto border rounded-md shadow-md">
            {selectables.map((collection) => (
              <CommandItem
                key={collection._id}
                onMouseDown={(e) => e.preventDefault()}
                onSelect={() => {
                  onChange(collection._id);
                  setInputValue("");
                  // setOpen(false); 
                  // close dropdown on selection
                }}
                className="hover:bg-grey-2 cursor-pointer"
              >
                {collection.title}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </div>
    </Command>
  );
};

export default MultiSelect;

