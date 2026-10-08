import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { SetStateAction } from "react";

interface CustomModelInputProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  contentStyle?: string;
}

export default function CustomModal({
  open,
  setOpen,
  children,
  title,
  footer,
  contentStyle,
}: CustomModelInputProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={`w-full md:w-[calc(100vw-20rem)] h-[calc(100vh-10rem)] overflow-y-auto overflow-x-hidden lg:max-h-[80%] ${
          contentStyle ? contentStyle : ""
        }`}
      >
        <DialogHeader>
          <DialogTitle>
            <span className="text-[1.25rem] font-[500] text-primaryColor">
              {title}
            </span>
          </DialogTitle>
          <DialogDescription>{children}</DialogDescription>
        </DialogHeader>
        <DialogFooter>{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
