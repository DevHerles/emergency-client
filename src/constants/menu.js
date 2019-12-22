const data = [
  {
    id: "dashboards",
    icon: "iconsminds-shop-4",
    label: "menu.dashboards",
    to: "/app/dashboards",
    subs: [
      {
        icon: "simple-icon-pie-chart",
        label: "menu.analytics",
        to: "/app/dashboards/default"
      }
    ]
  },
  {
    id: "emergency",
    icon: "iconsminds-ambulance",
    label: "emergency",
    to: "/app/emergency",
    subs: [
      {
        icon: "iconsminds-headset",
        label: "emergency.calls",
        to: "/app/emergency/calls"
      },
      {
        icon: "iconsminds-first-aid",
        label: "emergency.regulations",
        to: "/app/emergency/regulations"
      },
      {
        icon: "iconsminds-clinic",
        label: "emergency.dispatches",
        to: "/app/emergency/dispatches"
      }
    ]
  }
];
export default data;