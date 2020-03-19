const natureResourceRouter = require("express").Router();
const NatureResource = require("../models/natureResource");

// HTTP GET ALL RESOURCES
natureResourceRouter.get("/", (request, response) => {
  NatureResource.find({}).then(natureResources => {
    response.json(
      natureResources.map(natureResource => natureResource.toJSON())
    );
  });
});

// HTTP GET RESOURCE WITH ID
natureResourceRouter.get("/:id", (request, response, next) => {
  NatureResource.findById(request.params.id)
    .then(natureResource => {
      if (natureResource) {
        response.json(natureResource.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

// HTTP POST NEW RESOURCE
natureResourceRouter.post("/", (request, response, next) => {
  const body = request.body;

  const natureResource = new NatureResource({
    //parametrit
  });

  natureResource
    .save()
    .then(savedNatureResource => {
      response.json(savedNatureResource.toJSON());
    })
    .catch(error => next(error));
});

// HTTP UPDATE RESOURCE WITH ID
natureResourceRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const natureResource = {
    //parameters
  };

  NatureResource.findByIdAndUpdate(request.params.id, natureResource, {
    new: true
  })
    .then(updatedNatureResource => {
      response.json(updatedNatureResource.toJSON());
    })
    .catch(error => next(error));
});

// HTTP DELETE RESOURCE WITH ID
natureResourceRouter.delete("/:id", (request, response, next) => {
  NatureResource.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

module.exports = natureResourceRouter;
