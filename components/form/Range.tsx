import Input from "./Input";
import plur from "plur";

interface RangeProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  counter?: boolean;
  unit?: string;
  value?: number;
}

export default function Range({
  label,
  counter,
  unit,
  value,
  min,
  max,
  // pull type from passed props to prevent user from overriding type of range
  type,
  ...props
}: RangeProps) {
  // set default values for certain props if no values passed
  label = label.toLowerCase();
  value ??= undefined;
  min ??= 0;
  max ??= 10;

  return (
    <div className="flex flex-row gap-2 items-center">
      {/* Focus state on Input set to none -- focus outline moved to range thumb */}
      <Input
        className="bg-transparent cursor-grab appearance-none transition duration-100 focus:outline-none
                  
                  [&::-moz-range-track]:bg-neutral [&::-moz-range-track]:h-[3px] [&::-moz-range-track]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:w-[clamp(18px,3vw,25px)] [&::-moz-range-thumb]:h-[clamp(18px,3vw,25px)] [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb:active]:cursor-grabbing [&::-moz-range-thumb:active]:bg-primary-focus [&::-moz-range-thumb:active]:scale-110 [&::-moz-range-thumb:hover]:scale-110 [&::-moz-range-thumb:active]:shadow-md [&::-moz-range-thumb:active]:shadow-primary/50 [&::-moz-range-thumb:hover]:shadow-md [&::-moz-range-thumb:hover]:shadow-primary/50 [&:focus-visible::-moz-range-thumb]:outline [&:focus-visible::-moz-range-thumb]:outline-2 [&:focus-visible::-moz-range-thumb]:outline-offset-2 [&:focus-visible::-moz-range-thumb]:outline-primary [&:focus-visible::-moz-range-thumb]:scale-110
                
                  [&::-webkit-slider-runnable-track]:bg-neutral [&::-webkit-slider-runnable-track]:h-[3px] [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[clamp(18px,3vw,25px)] [&::-webkit-slider-thumb]:aspect-square [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb:active]:cursor-grabbing [&::-webkit-slider-thumb:active]:bg-primary-focus [&::-webkit-slider-thumb:hover]:scale-110 [&::-webkit-slider-thumb:active]:scale-110 [&::-webkit-slider-thumb:active]:shadow-md [&::-webkit-slider-thumb:active]:shadow-primary/50 [&::-webkit-slider-thumb:hover]:shadow-md [&::-webkit-slider-thumb:hover]:shadow-primary/50 [&::-webkit-slider-thumb]:mt-[calc((3px/2)-(clamp(18px,3vw,25px)/2))] [&:focus-visible::-webkit-slider-thumb]:outline [&:focus-visible::-webkit-slider-thumb]:outline-2 [&:focus-visible::-webkit-slider-thumb]:outline-offset-2 [&:focus-visible::-webkit-slider-thumb]:outline-primary [&:focus-visible::-webkit-slider-thumb]:scale-110"
        label={label}
        type="range"
        name={label}
        min={min}
        max={max}
        value={value}
        {...props}
      />

      {counter && (
        <span className="text-right text-xl min-w-[3ch] rounded-md select-none leading-4">
          {value}
          <br />
          <span className="text-sm font-thin">{unit && plur(unit, value)}</span>
        </span>
      )}
    </div>
  );
}
