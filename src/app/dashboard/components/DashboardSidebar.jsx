import { LuBell, LuMail, LuSettings, LuSearch, LuUser } from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";
import { TbLayoutSidebar } from "react-icons/tb";
import { Button, Drawer } from "@heroui/react";

export default function DashboardSidebar() {
  const navItems = [
    { icon: IoHomeOutline, label: "Home" },
    { icon: LuSearch, label: "Search" },
    { icon: LuBell, label: "Notifications" },
    { icon: LuMail, label: "Messages" },
    { icon: LuUser, label: "Profile" },
    { icon: LuSettings, label: "Settings" },
  ];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <button
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          type="button"
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </button>
      ))}
    </nav>
  );

  return (
    <>
    {/* Large device */}
    <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
      {navContent}
    </aside>
      {/* Small device */}
    <Drawer>
      <Button className="lg:hidden" variant="secondary">
        <TbLayoutSidebar />
        Menu
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Sidebar</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              {navContent}
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
    </>
  );
}
