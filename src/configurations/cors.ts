import cors from "cors";

const corsOptions = {
  origin: ["http://localhost:3000", "https://feedback-fe-eta.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200,
};

export default cors(corsOptions);
