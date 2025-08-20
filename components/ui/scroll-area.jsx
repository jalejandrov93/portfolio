import React from "react";
import { cn } from "../../lib/utils";

const ScrollArea = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("relative h-full", className)} {...props}>
      <div
        className="w-full h-full overflow-y-auto"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "var(--primary-dark) transparent",
        }}
      >
        {children}
      </div>
    </div>
  )
);
ScrollArea.displayName = "ScrollArea";

export { ScrollArea };
