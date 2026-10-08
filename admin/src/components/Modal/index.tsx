import { Modal as MantineModal } from "@mantine/core";
import { ReactNode } from "react";

interface modalProps {
  opened: boolean;
  close: () => void;
  title?: string;
  children?: ReactNode;
  className?: string;
  size?: string;
}

export default function Modal({
  className,
  opened,
  close,
  title,
  children,
  size,
}: modalProps) {
  return (
    <>
      <MantineModal
        className={className}
        opened={opened}
        onClose={close}
        title={title}
        centered
        size={size}
      >
        {children}
      </MantineModal>
    </>
  );
}
