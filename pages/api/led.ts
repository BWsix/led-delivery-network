import { Board, Led } from "johnny-five";
import { createNanoEvents } from "nanoevents";
import type { NextApiRequest, NextApiResponse } from "next";

interface Events {
  on: () => void;
  off: () => void;
}

const emitter = createNanoEvents<Events>();
const board = new Board({ repl: false });

board.on("ready", () => {
  console.log("init");

  const led = new Led(13);

  emitter.on("on", () => {
    led.on();
    console.log("on");
  });

  emitter.on("off", () => {
    led.off();
    console.log("off");
  });
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.init) {
    return res.end("init");
  }

  if (req.query.on) {
    emitter.emit("on");
    return res.end("on");
  }

  if (req.query.off) {
    emitter.emit("off");
    return res.end("off");
  }
}
