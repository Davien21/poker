import Emitter from "../services/emitter";

const banner = {
  error: (message, onClose) => {
    Emitter.emit("BANNER", { type: "error", message, onClose });
  },
  success: (message, onClose) => {
    Emitter.emit("BANNER", { type: "success", message, onClose });
  },
};

export default banner;
