import {
  CalendarCheck,
  NotebookPen,
  OctagonAlert,
  ShieldUser,
} from "lucide-react";

type TicketIconType = "urgent" | "events" | "news" | "notice";

type TicketIconProps = {
  type: TicketIconType;
  className?: string;
};

function TicketIcon({ type, className }: TicketIconProps) {
  switch (type) {
    case "urgent":
      return <OctagonAlert className={className} aria-hidden="true" />;

    case "events":
      return <CalendarCheck className={className} aria-hidden="true" />;

    case "news":
      return <NotebookPen className={className} aria-hidden="true" />;

    case "notice":
      return <ShieldUser className={className} aria-hidden="true" />;

    default:
      return null;
  }
}

export default TicketIcon;
export type { TicketIconType };
