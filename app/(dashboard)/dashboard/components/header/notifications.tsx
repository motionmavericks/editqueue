"use client"
import { useState } from "react"; // Import useState to manage state
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";

// Define the type for the Notification object
type Notification = {
  status: "unread" | "read";
  title: string;
  message: string;
};

const notifications: Notification[] = [
  {
    status: "unread",
    title: "Task Completed",
    message: "Your task has been completed successfully.",
  },
  {
    status: "read",
    title: "Task Deadline Approaching",
    message: "Your task deadline is approaching. Please take action.",
  },
  // Add more notifications as needed
];

export function NotificationsButton() {
  // State to manage the selected notification
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  // Handle click on a notification item
  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    // Handle notification click logic here, e.g., mark it as read or navigate to the notification's URL
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icons.notification />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-100">
        {notifications.map((notification, index) => (
          <DropdownMenuItem key={index} onClick={() => handleNotificationClick(notification)}>
            {/* Render the status icon */}
            <div className="mr-4 h-4 w-4">
              {notification.status === "unread" ? <Icons.unread /> : <Icons.read />}
            </div>
            <div className="px-2">
              {/* Render the title and message */}
              <p className="text-sm font-medium">{notification.title}</p>
              <p className="text-sm text-gray-600">{notification.message}</p>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
