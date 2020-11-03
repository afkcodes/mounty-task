const User = require("../db/model/User");
const getSortedResponse = require("../utils/util");

async function routes(fastify, options) {
  fastify.get("/users", async (request, reply) => {
    const { sortBy, limit } = request.query;
    const sortParam = {};

    if (sortBy !== "dist") {
      // Get Users Sorted by CreatetAt & Limit

      const parts = sortBy.split(":");
      sortParam[parts[0]] = parts[1] === "desc" ? 1 : -1;
      try {
        const users = await User.find({})
          .sort(sortParam)
          .limit(parseInt(limit));
        if (users) {
          reply.code(200).send(users);
        }
      } catch (error) {
        reply.send(error);
      }
    } else if (sortBy === "dist") {
      // Get All users Sorted By Distance

      const { lat, lon } = request.query;

      try {
        const users = await User.find({}).sort({ name: 1 });
        if (users) {
          const usersSortedByDistance = getSortedResponse(lat, lon, users);
          reply.send(usersSortedByDistance);
        }
      } catch (error) {
        reply.send(error);
      }
    } else {
      // Get All users

      try {
        const users = await User.find({}).sort({ name: 1 });
        if (users) {
          reply.code(200).send(users);
        }
      } catch (error) {
        reply.send(error);
      }
    }
  });

  fastify.post("/users", async (request, reply) => {
    // Create New users

    const user = new User(request.body);
    try {
      const result = await user.save();
      if (result) {
        reply.code(200).send(result);
      }
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.patch("/user/:id", async (request, reply) => {
    // Update Existing User

    const { id } = request.params;

    if (id === null || id === "") {
      reply.code(200).send({
        error: "id is needed to update user details",
      });
    } else {
      const user = await User.findById(id);
      if (!user) {
        reply.code(404).send("User Not Found");
      } else {
        try {
          console.log(request.body, id);
          const result = await User.updateOne(
            { _id: id },
            { $set: request.body }
          );
          if (result) {
            reply.code(200).send("User Updated Successfully");
          }
        } catch (error) {
          reply.code(400).send("Server Error Occoured");
        }
      }
    }
  });

  fastify.delete("/user/:id", async (request, reply) => {
    // Delete Existing Users

    const { id } = request.params;
    if (id === null || id === "") {
      reply.code(200).send({
        error: "id is needed to update user details",
      });
    } else {
      const user = await User.findById(id);
      if (!user) {
        reply.code(404).send("User Not Found");
      } else {
        try {
          const result = await User.findByIdAndDelete(id);
          if (result) {
            reply.code(200).send("User Deleted Successfully");
          }
        } catch (error) {
          reply.code(400).send("Server Error Occoured");
        }
      }
    }
  });
}

module.exports = routes;
