const natureResourceRouter = require("express").Router();
const NatureResource = require("../models/natureResource").NatureResource;

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
    name: { fi: body.name.fi, en: body.name.en },
    category: body.category,
    harvestSeason: {
      start: body.harvestSeason.start,
      end: body.harvestSeason.end
    }
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
    name: { fi: body.name.fi, en: body.name.en },
    category: body.category,
    harvestSeason: {
      start: body.harvestSeason.start,
      end: body.harvestSeason.end
    }
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
