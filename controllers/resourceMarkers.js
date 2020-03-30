const resourceMarkerRouter = require("express").Router();
const ResourceMarker = require("../models/resourceMarker");
const User = require("../models/user");

// HTTP GET ALL MARKERS
resourceMarkerRouter.get("/", async (request, response, next) => {
  try {
    const resourceMarkers = await ResourceMarker.find({})
      .populate("natureResource")
      .populate("addedByUser", { username: 1 });
    response.json(
      resourceMarkers.map(resourceMarker => resourceMarker.toJSON())
    );
  } catch (error) {
    next(error);
  }
});

// HTTP GET MARKER WITH ID
resourceMarkerRouter.get("/:id", async (request, response, next) => {
  try {
    const resourceMarker = await ResourceMarker.findById(request.params.id);
    response.json(resourceMarker.toJSON());
  } catch (error) {
    next(error);
  }
});

// HTTP POST NEW MARKER
resourceMarkerRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const user = await User.findById(body.userId);

  const resourceMarker = new ResourceMarker({
    latLng: {
      latitude: body.latLng.latitude,
      longitude: body.latLng.longitude
    },
    locationName: body.locationName,
    addedByUser: user._id,
    date: new Date(),
    comment: body.comment,
    natureResource: body.natureResource
  });

  try {
    const savedResourceMarker = await resourceMarker.save();
    user.resourceMarkers = user.resourceMarkers.concat(savedResourceMarker._id);
    await user.save();
    response.json(savedResourceMarker.toJSON());
  } catch (error) {
    next(error);
  }
});

// HTTP UPDATE MARKER WITH ID
resourceMarkerRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const resourceMarker = {
    latLng: {
      latitude: body.latLng.latitude,
      longitude: body.latLng.longitude
    },
    locationName: body.locationName,
    comment: body.comment,
    natureResource: body.natureResource
  };

  try {
    const updatedResourceMarker = await ResourceMarker.findByIdAndUpdate(
      request.params.id,
      resourceMarker,
      {
        new: true
      }
    );

    response.json(updatedResourceMarker.toJSON());
  } catch (error) {
    next(error);
  }
});

// HTTP DELETE MARKER WITH ID
resourceMarkerRouter.delete("/:id", async (request, response, next) => {
  try {
    await ResourceMarker.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = resourceMarkerRouter;
