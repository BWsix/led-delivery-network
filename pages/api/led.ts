import { Board, Led } from "johnny-five";
import { createNanoEvents } from "nanoevents";
import type { NextApiRequest, NextApiResponse } from "next";

const emitter = createNanoEvents();
const board = new Board({ repl: false });

board.on("ready", () => {
  const led = new Led(13);

  emitter.on("on", () => {
    led.on();
  });

  emitter.on("off", () => {
    led.off();
  });
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.on) {
    emitter.emit("on");
    return res.end("on");
  }

  if (req.query.off) {
    emitter.emit("off");
    return res.end("off");
  }
}
