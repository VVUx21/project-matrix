export type EventItem = {
  time: string;
  title: string;
  venue: string;
  description: string;
};

export type DayKey = "day1" | "day2" | "day3";

export const DATA: Record<DayKey, EventItem[]> = {
  day1: [
    {
      time: "4:00 PM – 6:00 PM",
      title: "Psi-phi",
      venue: "LA – 104",
      description: "",
    },
    {
      time: "5:00 PM – 8:00 PM",
      title: "Shake it off",
      venue: "LA204",
      description: "",
    },
    {
      time: "6PM Onwards",
      title: "SHOWDOWN",
      venue: "DTS Stage",
      description: "",
    },
    {
      time: "09:00 PM – 2:00 AM",
      title: "Stellar Night",
      venue: "Electrical building Rooftop",
      description: "",
    },
    {
      time: "3:00 PM – 7:00 PM",
      title: "Robo Sumo War",
      venue: "Basketball court",
      description: "",
    },
    {
      time: "3:00 PM – 7:00 PM",
      title: "Death Race",
      venue: "Sac stairs",
      description: "",
    },
     
    
  ],

  day2: [
    {
      time: "Football - 9 am onwards",
      title: "Rotaomlypics ",
      venue: "Handball court",
      description: "",
    },
      {
      time: "Cricket - 8 am onwards",
      title: "Rotaomlypics ",
      venue: "Basketball practice (box cricket)",
      description: "",
    },
    {
      time: "Badminton - 9 pm Onwards",
      title: "Rotaomlympics",
      venue: "Badminton GDB badminton court",
      description: "",
    },
    {
      time: "Tug of War - 2 pm onwards",
      title: "Rotaomlympics",
      venue: "SSB Hall Front",
      description: "",
    },

    {
      time: "8 am - 6 pm",
      title: "Little Science Yard",
      venue: "Chemical Department Parking",
      description: "",
    },
    {

      time: "9-12pm",
      title: "INTELLIGENT TRADER 11.0",
      venue: "LA-114",
      description: "",
    },
    
    {

      time: "9-12pm",
      title: "AQUA LABYRINTH",
      venue: "LA 217",
      description: "",
    },
    {

      time: "9-12pm",
      title: "Flag in the Blue",
      venue: "LA 114 , LA 401",
      description: "",
    },
    {

      time: "9AM -12PM",
      title: "WS2",
      venue: "LA 101",
      description: "",
    },
    {

      time: "1-4PM",
      title: "Roadies Food Saga 3.0",
      venue: "LA317",
      description: "",
    },
    {

      time: "9am -12 pm",
      title: "omega",
      venue: "LA lawn , LA 004 , LA009",
      description: "",
    },
    {

      time: "10-12 pm",
      title: "virtual trading",
      venue: "LA 104",
      description: "",
    },
    {

      time: "10 - 2pm",
      title: "WS1",
      venue: "PPA",
      description: "",
    },
    {

      time: "10 am - 3pm",
      title: "Ipl Auction",
      venue: "Round 1 -LA 104 , Round 2 - LA 310",
      description: "",
    },
    {

      time: "11am - 6pm",
      title: "Sunken Cipher",
      venue: "LA204",
      description: "",
    },
    {

      time: "1-7pm",
      title: "Robo sumo",
      venue: "Basketball Court",
      description: "",
    },
    {

      time: "1-5 pm",
      title: "Webclone mania",
      venue: "LA 1",
      description: "",
    },
    {

      time: "1 pm - 6pm",
      title: "Aeroprix",
      venue: "STS",
      description: "",
    },
{

      time: "1 pm - 6pm",
      title: "Case Carnival",
      venue: "LA 104",
      description: "",
    },
    {

      time: "1 :30 pm- 4:30 pm",
      title: "Satquest",
      venue: "LA 009",
      description: "",
    },
    {

      time: "1 pm - 5pm",
      title: "In-verse",
      venue: "LA 004",
      description: "",
    },
    {

      time: "1.30pm-4.30pm",
      title: "Spark-a-thon",
      venue: "",
      description: "",
    },
    {

      time: "2-6pm",
      title: "inspire",
      venue: "LA 101",
      description: "",
    },
    {

      time: "2 pm - 5pm",
      title: "Virtual racing simulator",
      venue: "LA 201",
      description: "",
    },
    {

      time: "2 pm - 3 pm",
      title: "GL 1",
      venue: "BBA",
      description: "",
    },
    {

      time: "3 pm - 4 pm",
      title: "GL 2",
      venue: "BBA",
      description: "",
    },
    {

      time: "5 pm - 6 pm",
      title: "GL 3",
      venue: "BBA",
      description: "",
    },
    {
      time: "3 pm - 5pm",
      title: "Design Dash",
      venue: "LA 1+LA LAWNS",
      description: "",
    }, 
      {
      time: "2 pm - 5pm",
      title: "Missin CEO (Grapevine Business Club )",
      venue: "LA 217  + LA lawns for treasure hunt",
      description: "",
    },  
    {
      time: "5 pm - 6 pm",
      title: "Introduction to GPU(GTA)",
      venue: "Guest lecture (PPA)",
      description: "",
    },
    {
      time: "10 pm - 2 am",
      title: "Stellar night",
      venue: "Electric building Rooftop",
      description: "",
    },
    {

      time: "Full day",
      title: "Death Race",
      venue: "SAC stairs",
      description: "",
    },
    {

      time: "Full day",
      title: "Velocity vortex",
      venue: "Sts Cricket Nets",
      description: "",
    },
    {

      time: "Full day",
      title: "Mazehunt",
      venue: "LA cycle stand",
      description: "",
    },
    {

      time: "Full day",
      title: "Reef Rumble: Call of the Deep",
      venue: "LA 214",
      description: "",
    },
  ],

  day3: [
    {
      time: "Football - 9 am onwards",
      title: "Rotaomlypics ",
      venue: "Handball court",
      description: "",
    },
      {
      time: "Cricket - 8 am onwards",
      title: "Rotaomlypics ",
      venue: "Basketball practice (box cricket)",
      description: "",
    },
    {
      time: "Badminton - 9 pm Onwards",
      title: "Rotaomlympics",
      venue: "Badminton GDB badminton court",
      description: "",
    },
    {
      time: "Tug of War - 2 pm onwards",
      title: "Rotaomlympics",
      venue: "SSB Hall Front",
      description: "",
    },
     
    {
      time: "8:00 AM – 12:00 PM",
      title: "Matrix Mystery Mania",
      venue: "HB front ground",
      description: "",
    },
    {
      time: "9-12pm",
      title: "Flag in the blue",
      venue: "LA101 ",
      description: "",
    },
    {
      time: "9-12am",
      title: "Hydronaut",
      venue: "LA204 SAC garden",
      description: "",
    },
    {
      time: "11-12 AM",
      title: "GL 4",
      venue: "BBA",
      description: "",
    },
    {
      time: "9-12pm",
      title: "AQUA LABYRINTH",
      venue: "LA 217",
      description: "",
    },
    {
      time: "2-5pm",
      title: "Sci biz tech quiz",
      venue: "LA 201",
      description: "",
    },
    {
      time: "10:00 PM – 3:00 PM",
      title: "Spark-a-thon",
      venue: "LA – 104",
      description: "",
    },
    {
      time: "10 am - 12pm",
      title: "Ceramarin Quiz",
      venue: "LA – 009",
      description: "",
    },

    {
      time: "11 AM- 4 PM",
      title: "Prompt Abyss",
      venue: "LA 114(medium room)",
      description: "",
    },
    {
      time: "2:00 PM – 3:00 PM",
      title: "GL 5",
      venue: "BBA",
      description: "",
    },
    {
      time: "3:00 PM – 4:00 PM",
      title: "GL -6",
      venue: "BBA",
      description: "",
    },
    {
      time: "4:00 PM – 5:00 PM",
      title: "GL 7",
      venue: "BBA",
      description: "",
    },
    {
      time: "1:30 PM – 5:00 PM",
      title: "Hustlemania",
      venue: "LA Lawn",
      description: "",
    },
    {
      time: "2:00 PM – 6:00 PM",
      title: "WS3",
      venue: "PPA",
      description: "",
    },
    {
      time: "2:00 PM – 5:00 PM",
      title: "Alloy Auction",
      venue: "LA – 117",
      description: "",
    },
    {
      time: "3:00 PM – 6:00 PM",
      title: "Hovermania",
      venue: "Basketball Court",
      description: "",
    },
    {
      time: "All day",
      title: "Car show",
      venue: "STS",
      description: "",
    },
    {
      time: "Full day",
      title: "Reef Rumble: Call of the Deep",
      venue: "LA – 214",
      description: "",
    },
    {
      time: "Full day",
      title: "Mazehunt",
      venue: "LA Cycle stand",
      description: "",
    },
     
  ],
};
