const data = [
  {
    id: "dashboards",
    icon: "iconsminds-shop-4",
    label: "menu.dashboards",
    to: "/app/dashboards",
    subs: [
      {
        icon: "simple-icon-briefcase",
        label: "menu.default",
        to: "/app/dashboards/default"
      },
      {
        icon: "simple-icon-pie-chart",
        label: "menu.analytics",
        to: "/app/dashboards/analytics"
      },
      {
        icon: "simple-icon-basket-loaded",
        label: "menu.ecommerce",
        to: "/app/dashboards/ecommerce"
      },
      {
        icon: "simple-icon-doc",
        label: "menu.content",
        to: "/app/dashboards/content"
      }
    ]
  },
  {
    id: "emergencies",
    icon: "iconsminds-ambulance",
    label: "emergency",
    to: "/app/emergencies",
    subs: [
      {
        icon: "iconsminds-headset",
        label: "emergency.calls",
        to: "/app/emergencies/calls"
      },
      {
        icon: "iconsminds-first-aid",
        label: "emergency.regulations",
        to: "/app/emergencies/regulations"
      },
      {
        icon: "iconsminds-clinic",
        label: "emergency.dispatches",
        to: "/app/emergencies/dispatches"
      }
    ]
  }
];
export default data;
