"use client";
import { AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteDialogProps {
  title: string;
  description: string;
  cancelText: string;
  confirmText: string;
  onCancel: () => void;
  onConfirm: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function DeleteDialog({
  title,
  description,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  isOpen,
  setIsOpen,
}: DeleteDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-col items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
            <AlertCircle className="h-6 w-6 text-red-500" />
          </div>
          <DialogTitle className="text-center text-xl">{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center text-base">
          {description}
        </DialogDescription>
        <DialogFooter className="flex flex-row gap-2 sm:justify-center">
          <Button
            variant="outline"
            className="flex-1 sm:flex-initial"
            onClick={onCancel}
          >
            {cancelText}
          </Button>
          <Button
            variant="destructive"
            className="flex-1 sm:flex-initial"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
