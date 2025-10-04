import server from "./app";

const start = async () => {
  try {
    await server.listen({ port: 4000, host: "0.0.0.0" });
    console.log("Server ready at http://localhost:4000");
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();
