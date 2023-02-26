import io from "socket.io-client";
import { Socket } from "socket.io-client/build/esm/socket";
import { FilterPayload } from "../interface/IExchangeFilter";
import { store } from "../store";
import { setHistory } from "../store/history.store";

const SOCKET_PATH = "/socket.io/";

/**
 * The socket serivice manages all socket connection, events etc.
 */
export default class SocketService {
  socket: Socket;
  constructor() {
    this.socket = io(
      `http://${window.location.hostname}:${process.env.REACT_APP_SCOKET_PORT}`,
      { path: SOCKET_PATH }
    );
  }

  /**
   * Initialize the socket connection and handle all socket events.
   */
  initializeConnect() {
    this.socket.on("connect", () => {
      console.debug("Connected to socket server");
    });

    this.socket.on("disconnect", () => {
      console.debug("Disconnected from socket server");
    });

    this.socket.on("data", (data) => {
      if (data && data.length > 0) {
        store.dispatch(setHistory(data));
      }
    });
  }

  /**
   * The method for start subscribing data fom backend.
   * @param filters
   */
  startSubscription(filters: FilterPayload) {
    this.socket.emit("start-subscription", { ...filters });
  }

  /**
   * The method for stop subscribing data fom backend.
   */
  stopSubscription() {
    this.socket.emit("stop-subscription");
  }

  /**
   * The method disconnect the socket connection.
   */
  close() {
    this.socket.off("connect");
    this.socket.off("disconnect");
    this.socket.off("pong");
  }
}
