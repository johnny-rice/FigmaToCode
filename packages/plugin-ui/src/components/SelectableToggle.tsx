import { HelpCircle } from "lucide-react";
import { cn } from "../lib/utils";
import { Checkbox } from "./ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type SelectableToggleProps = {
  onSelect: (isSelected: boolean) => void;
  isSelected?: boolean;
  title: string;
  description?: string;
  buttonClass: string;
  checkClass: string;
};

const SelectableToggle = ({
  onSelect,
  isSelected = false,
  title,
  description,
  buttonClass,
  checkClass,
}: SelectableToggleProps) => {
  const handleClick = () => {
    onSelect(!isSelected);
  };

  return (
    <div className="relative inline-block">
      <div
        role="button"
        tabIndex={0}
        aria-pressed={isSelected}
        onClick={handleClick}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleClick();
          }
        }}
        className={cn(
          "h-8 px-2 flex items-center justify-center rounded-md transition-all duration-200 border cursor-pointer",
          isSelected
            ? `${buttonClass} text-white shadow-2xs border-transparent`
            : "bg-muted hover:bg-neutral-200 dark:hover:bg-neutral-700 text-muted-foreground border",
        )}
      >
        <div className="flex items-center gap-2 text-muted-foreground">
          <Checkbox
            checked={isSelected}
            tabIndex={-1}
            className={cn(
              "pointer-events-none h-4 w-4 rounded-md transition-all duration-200",
              isSelected
                ? `${checkClass}`
                : "bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600",
            )}
          />

          <span
            className={cn(
              "text-sm font-medium whitespace-nowrap",
              isSelected && "text-green-800 dark:text-foreground",
            )}
          >
            {title}
          </span>

          {/* Help icon for description */}
          {description && (
            <Tooltip>
              <TooltipTrigger
                render={
                  <div className="hover:text-foreground transition-opacity cursor-help" />
                }
              >
                <HelpCircle size={12} />
              </TooltipTrigger>
              <TooltipContent className="w-48 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 shadow-lg">
                {description}
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectableToggle;
