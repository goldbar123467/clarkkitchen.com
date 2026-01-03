import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-6xl grid-cols-1 gap-4 md:auto-rows-[20rem] md:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl p-4 md:p-6 transition-all duration-300",
        // Batman Beyond theming
        "bg-gradient-to-br from-[#0f0f0f] to-[#0a0a0a]",
        "border border-[#1f1f1f]",
        "hover:border-[#ff2d2d]/50 hover:shadow-[0_0_30px_rgba(255,45,45,0.2)]",
        className,
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="mt-2 mb-2 font-mono font-bold text-[#ff2d2d] uppercase tracking-wider text-sm">
          {title}
        </div>
        <div className="font-mono text-xs text-[#6b7280]">
          {description}
        </div>
      </div>
    </div>
  );
};
