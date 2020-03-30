const natureResourceRouter = require("express").Router();
const NatureResource = require("../models/natureResource").NatureResource;

// HTTP GET ALL RESOURCES
natureResourceRouter.get("/", async (request, response, next) => {
  try {
    const natureResources = await NatureResource.find({});
    response.json(
      natureResources.map(natureResource => natureResource.toJSON())
    );
  } catch (error) {
    next(error);
  }
});

// HTTP GET RESOURCE WITH ID
natureResourceRouter.get("/:id", async (request, response, next) => {
  try {
    const natureResource = await NatureResource.findById(request.params.id);
    response.json(natureResource.toJSON());
  } catch (error) {
    next(error);
  }
});

// HTTP POST NEW RESOURCE
natureResourceRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const natureResource = new NatureResource({
    name: { fi: body.name.fi, en: body.name.en },
    category: body.category,
    iconUrl: body.iconUrl,
    harvestSeason: {
      start: body.harvestSeason.start,
      end: body.harvestSeason.end
    }
  });

  try {
    const savedNatureResource = await natureResource.save();
    response.json(savedNatureResource.toJSON());
  } catch (error) {
    next(error);
  }
});

// HTTP UPDATE RESOURCE WITH ID
natureResourceRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const natureResource = {
    name: { fi: body.name.fi, en: body.name.en },
    category: body.category,
    iconUrl: body.iconUrl,
    harvestSeason: {
      start: body.harvestSeason.start,
      end: body.harvestSeason.end
    }
  };

  try {
    const updatedNatureResource = await NatureResource.findByIdAndUpdate(
      request.params.id,
      natureResource,
      {
        new: true
      }
    );
    response.json(updatedNatureResource.toJSON());
  } catch (error) {
    next(error);
  }
});

// HTTP DELETE RESOURCE WITH ID
natureResourceRouter.delete("/:id", async (request, response, next) => {
  try {
    await NatureResource.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = natureResourceRouter;
