// service-worker.js
const CACHE_NAME = "space-mission-v1";

// Real data from the workshop
const DATA = {
  logs: [
    {
      date: "10/04/2099",
      activity: "MISSION LAUNCH",
    },
    {
      date: "23/09/3001",
      activity: "TEAM MUTINY",
      result: "Changed captain to be IT AI System",
      who: 12,
    },
    {
      date: "17/06/3010",
      activity: "MEDICAL BREAKTHROUGH",
      result: "Last person was vaccinated for Covid. Had a big party.",
      who: 4,
    },
    {
      date: "33/07/3011",
      activity: "ENTERTAINMENT",
      info: "Rewatched final episode of Line of Duty",
    },
    {
      date: "14/07/3012",
      activity: "CATASTROPHIC SPILLAGE",
      info: "Kyle's tea was once again the root of all our problems when it was spilt over the main console...",
      who: 7,
    },
    {
      date: "12/05/3015",
      activity: "CHANGE LAUNCH CODES",
      who: 8,
    },
    {
      date: "23/10/3017",
      activity: "BETRAYAL",
      info: "Ate the last chocolate rations",
      result: "Threatened with airlock expulsion",
      who: 3,
    },
    {
      date: "24/10/3017",
      activity: "REDEMPTION",
      info: "Sincere apology; promise to scrub the ship's personnel facilities weekly until the next supplies shipment arrives",
      result: "Allowed to remain onboard",
      who: 3,
    },
  ],
  personnel: [
    {
      id: 1,
      species: "Tiger",
      name: "Lizzie",
      dateOfBirth: "02/09/2097",
    },
    {
      id: 2,
      species: "Human",
      name: "James",
      dateOfBirth: "28/10/2075",
    },
    {
      id: 3,
      species: "Cat",
      name: "Liz",
      dateOfBirth: "03/03/2092",
    },
    {
      id: 4,
      species: "Human",
      name: "Tao",
      dateOfBirth: "04/15/2090",
    },
    {
      id: 5,
      species: "Shark",
      name: "Max",
      dateOfBirth: "10/31/2091",
    },
    {
      id: 6,
      species: "Human",
      name: "Anna-Marie",
      dateOfBirth: "14/02/2073",
    },
    {
      id: 7,
      species: "Fish",
      name: "Kyle",
      dateOfBirth: "04/07/2095",
    },
    {
      id: 8,
      species: "Human",
      name: "Chris",
      dateOfBirth: "01/01/2085",
    },
    {
      id: 9,
      species: "Monkey",
      name: "Ben",
      dateOfBirth: "17/05/2094",
    },
    {
      id: 10,
      species: "Human",
      name: "Joe",
      dateOfBirth: "15/01/2080",
    },
    {
      id: 11,
      species: "Dog",
      name: "Rover",
      dateOfBirth: "05/12/2099",
    },
    {
      id: 12,
      species: "AI",
      name: "IT AI System",
      dateOfBirth: "10/10/2052",
    },
  ],
  messages: [
    {
      date: "13/05/3015",
      to: 5,
      from: 2,
      subject: "HANDS OFF MY GORGONZOLA",
      message:
        "If I've told you once, I've told you 1000 times... DON'T BE TOUCHING MY CHEESE MAN! This is medical grade gorgonzola, not just your crappy cheddar, so please don't use it for your ham and cheese toasties!",
    },
    {
      date: "20/09/3005",
      to: 3,
      from: 4,
      subject: "URGENT REQUEST - MISSION CRITICAL",
      message: "Have you seen my glasses?",
    },
    {
      date: "21/09/3005",
      to: 3,
      from: 4,
      subject: "URGENT UPDATE - MISSION CRITICAL",
      message: "Never mind. Found them.",
    },
    {
      date: "13/05/3015",
      to: 12,
      from: 9,
      subject: "Recreation request",
      message: "Add ping pong balls and bins to upcoming supply request.",
    },
    {
      date: "13/05/3015",
      to: 8,
      from: 12,
      subject: "LAUNCH CODES: Weak Change",
      message:
        "Why oh why did you change the launch codes to that? You can't just have them as your name, silly. I've changed it to the ship's dog's name because he'll never talk. Slightly better if you ask me... which you never do :(",
    },
    {
      date: "15/05/3015",
      to: 5,
      from: 5,
      subject: "Hello",
      message:
        "I think the stress is getting to me. I am actually writing to myself.",
    },
    {
      date: "17/08/3015",
      to: 4,
      from: 1,
      subject: "Assistance Needed",
      message: "3 across: Orange and sounds like a parrot? Any ideas?",
    },
    {
      date: "18/08/3015",
      to: 1,
      from: 4,
      subject: "Re: Assistance Needed",
      message: "It's a carrot, you plum!",
    },
  ],
  codes: {
    enter: "ROVER",
  },
};

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Only handle our specific API routes
  if (!url.pathname.startsWith("/api/")) {
    return;
  }

  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname.replace("/api", "");
  const method = request.method;

  // Handle different routes
  switch (true) {
    case path === "/" && method === "GET":
      return new Response(
        JSON.stringify({
          title: "Welcome",
          message:
            "Our spaceship needs to leave Earth... pronto. The only problem is that we can't figure out the launch codes for the ship - can you help us? Use the fetch protocol you learned at the academy to navigate through the map.",
          map: ["/logs", "/personnel", "/messages", "/hint", "/codes"],
        }),
        { headers: { "Content-Type": "application/json" } }
      );

    case path === "/logs" && method === "GET":
      return new Response(JSON.stringify(DATA.logs), {
        headers: { "Content-Type": "application/json" },
      });

    case path === "/personnel" && method === "GET":
      return new Response(
        JSON.stringify({
          WARNING:
            "Stop being greedy. Search for individual personnel only! e.g the ship's dog is id = 11",
        }),
        { headers: { "Content-Type": "application/json" } }
      );

    case path.startsWith("/personnel/") && method === "GET":
      const id = parseInt(path.split("/")[2]);
      const person = DATA.personnel.find((p) => p.id === id);
      return new Response(JSON.stringify(person), {
        headers: { "Content-Type": "application/json" },
      });

    case path === "/messages" && method === "GET":
      const params = new URLSearchParams(url.search);
      const to = parseInt(params.get("to"));

      if (to) {
        const filtered = DATA.messages.filter((m) => m.to === to);
        return new Response(JSON.stringify(filtered), {
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response(
        JSON.stringify({
          WARNING:
            "You can't view them all. Naughty naughty! Search for messages using the id of the recipient.",
        }),
        { headers: { "Content-Type": "application/json" } }
      );

    case path === "/hint" && method === "GET":
      return new Response(
        JSON.stringify({
          length: 5,
          type: "string",
          rules: "It's so important, you have to make it UPPER CASE!",
        }),
        { headers: { "Content-Type": "application/json" } }
      );

    case path === "/codes" && method === "POST":
      const body = await request.json();
      const success = body.enter === DATA.codes.enter;

      return new Response(
        JSON.stringify({
          success,
          message: success
            ? "Maybe now you have time to catch-up with the gossip and read all of the other messages..."
            : "Wrong code, try again!",
          img: success ? "success.gif" : "failure.gif",
        }),
        { headers: { "Content-Type": "application/json" } }
      );

    default:
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
  }
}
