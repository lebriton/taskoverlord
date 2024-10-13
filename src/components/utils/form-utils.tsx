import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input, InputProps } from "../ui/input";
import { TooltipWrapper } from "./tooltip-utils";
import { Group } from "@/components/custom/group";
import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

interface FormColumnProps {
  className?: string;
}

interface FormGroupProps {
  name: string;
}
interface FormItemWrapperProps {
  label?: React.ReactNode;
}

function FormColumn({ className, children }: PropsWithChildren<FormColumnProps>) {
  return <div className={cn("flex flex-col gap-y-2.5", className)}>{children}</div>;
}

function FormGroup({ name, children }: PropsWithChildren<FormGroupProps>) {
  return (
    <Group
      className="border-t !bg-transparent py-1 font-bold hover:text-foreground data-[state=open]:text-foreground"
      name={name}
    >
      <FormColumn className="pb-6 pe-3 ps-5 pt-3">{children}</FormColumn>
    </Group>
  );
}

function FormItemWrapper({ label, children }: PropsWithChildren<FormItemWrapperProps>) {
  return (
    <FormItem>
      <div className="flex items-center gap-2">
        {label && (
          <FormLabel className="w-48 text-end">
            <TooltipWrapper content={<p>{label}</p>}>
              <span>{label}:</span>
            </TooltipWrapper>
          </FormLabel>
        )}
        <FormControl>{children}</FormControl>
      </div>
      <FormMessage />
    </FormItem>
  );
}

function PlainInput({ ...props }: InputProps) {
  return (
    <Input
      className="h-auto !cursor-text border-none bg-transparent p-0 !opacity-100 shadow-none"
      disabled
      {...props}
    />
  );
}

export { FormColumn, FormGroup, FormItemWrapper, PlainInput };
