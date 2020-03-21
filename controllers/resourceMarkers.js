const resourceMarkerRouter = require("express").Router();
const ResourceMarker = require("../models/resourceMarker");

// HTTP GET ALL MARKERS
resourceMarkerRouter.get("/", (request, response) => {
  ResourceMarker.find({}).then(resourceMarkers => {
    response.json(
      resourceMarkers.map(resourceMarker => resourceMarker.toJSON())
    );
  });
});

// HTTP GET MARKER WITH ID
resourceMarkerRouter.get("/:id", (request, response, next) => {
  ResourceMarker.findById(request.params.id)
    .then(resourceMarker => {
      if (resourceMarker) {
        response.json(resourceMarker.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

// HTTP POST NEW MARKER
resourceMarkerRouter.post("/", (request, response, next) => {
  const body = request.body;

  // reference to users added when that is implemented
  const resourceMarker = new ResourceMarker({
    latLng: {
      latitude: body.latLng.latitude,
      longitude: body.latLng.longitude
    },
    locationName: body.locationName,
    comment: body.comment,
    natureResource: body.natureResource //for testing: '5e7639f65c3f9a1a2cb43448'
  });

  resourceMarker
    .save()
    .then(savedResourceMarker => {
      response.json(savedResourceMarker.toJSON());
    })
    .catch(error => next(error));
});

// HTTP UPDATE MARKER WITH ID
resourceMarkerRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const resourceMarker = {
    latLng: {
      latitude: body.latLng.latitude,
      longitude: body.latLng.longitude
    },
    locationName: body.locationName,
    comment: body.comment,
    natureResource: body.natureResource //for testing: '5e7639f65c3f9a1a2cb43448'
  };

  ResourceMarker.findByIdAndUpdate(request.params.id, resourceMarker, {
    new: true
  })
    .then(updatedResourceMarker => {
      response.json(updatedResourceMarker.toJSON());
    })
    .catch(error => next(error));
});

// HTTP DELETE MARKER WITH ID
resourceMarkerRouter.delete("/:id", (request, response, next) => {
  ResourceMarker.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

module.exports = resourceMarkerRouter;
