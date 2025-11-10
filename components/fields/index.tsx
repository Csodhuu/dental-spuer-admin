"use client";

import { Control, FieldValues, Path } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";

interface DateFieldRHFProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
  placeholder?: string;
}

export function DateFieldRHF<T extends FieldValues>({
  control,
  name,
  label,
  required = false,
  placeholder = "Огноо сонгох",
}: DateFieldRHFProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      rules={required ? { required: `${label} шаардлагатай` } : {}}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="text-sm font-medium">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? format(field.value, "PPP") : placeholder}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

interface InputFieldRHFProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
}

export function InputFieldRHF<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  required = false,
  type = "text",
}: InputFieldRHFProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={type}
              value={field.value?.toString() ?? ""}
              onChange={(e) => {
                const raw = e.target.value;
                if (type === "number") {
                  if (raw === "") {
                    field.onChange("");
                  } else {
                    const parsed = Number(raw);
                    if (!isNaN(parsed)) field.onChange(parsed);
                  }
                } else {
                  field.onChange(raw);
                }
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

interface Option {
  label: string;
  value: string;
}

interface SelectFieldRHFProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: Option[];
  required?: boolean;
  placeholder?: string;
}

export function SelectFieldRHF<T extends FieldValues>({
  control,
  name,
  label,
  options,
  required = false,
  placeholder = "Сонгох",
}: SelectFieldRHFProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
      rules={required ? { required: `${label} шаардлагатай` } : {}}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="h-[200px] overflow-y-auto">
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

interface RadioFieldRHFProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: { label: string; value: string | boolean }[];
  required?: boolean;
}

export function RadioFieldRHF<T extends FieldValues>({
  control,
  name,
  label,
  options,
  required = false,
}: RadioFieldRHFProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
      rules={required ? { required: `${label} шаардлагатай` } : {}}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value?.toString()}
              className="flex gap-4"
            >
              {options.map((opt) => (
                <div
                  key={opt.value.toString()}
                  className="flex items-center space-x-2"
                >
                  <RadioGroupItem
                    value={opt.value.toString()}
                    id={`${name}-${opt.value}`}
                  />
                  <label htmlFor={`${name}-${opt.value}`} className="text-sm">
                    {opt.label}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

interface SwitchFieldRHFProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
}

export function SwitchFieldRHF<T extends FieldValues>({
  control,
  name,
  label,
}: SwitchFieldRHFProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="flex items-center space-x-4">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

interface CheckboxGroupFieldRHFProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: { label: string; value: string }[];
}

export function CheckboxGroupFieldRHF<T extends FieldValues>({
  control,
  name,
  label,
  options,
}: CheckboxGroupFieldRHFProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="space-y-2">
              {options.map((opt) => {
                const isChecked = Array.isArray(field.value)
                  ? field.value.includes(opt.value)
                  : false;

                return (
                  <div key={opt.value} className="flex items-center space-x-2">
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={(checked) => {
                        const current = Array.isArray(field.value)
                          ? field.value
                          : [];
                        const updated = checked
                          ? [...current, opt.value]
                          : current.filter((v) => v !== opt.value);
                        field.onChange(updated);
                      }}
                    />
                    <span className="text-sm">{opt.label}</span>
                  </div>
                );
              })}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
