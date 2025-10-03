import {
    mainEvents,
    flagships,
    workshops,
    funevents,
    guestLectures,
  } from "@/app/events/constants";
  
  const data = [
    {
      id: "1",
      name: "FLAGSHIP",
      total: flagships.length,
      url: "/events/#flagship",
    },
    {
      id: "2",
      name: "GUEST LECTURES",
      total: guestLectures.length,
      url: "/events/#guest-lectures",
    },
  
    {
      id: "3",
      name: "MAIN EVENTS",
      total: mainEvents.length,
      url: "/events/#proshow",
    },
    {
      id: "4",
      name: "FUN EVENTS",
      total: funevents.length,
      url: "/events/#funevents",
    },
    {
      id: "5",
      name: "Workshops",
      total: workshops.length/2,
      url: "/events/#exhibitions",
    },
  ];
  
  export default data;