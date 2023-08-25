const Clarifai = require("clarifai")
const clarifaiApp = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY, // Load the API key from environment variables
})

// handleImage = (req, res, db) => {
//   const { id } = req.body;
//   db('users')
//       .where('id', '=', id)
//       .increment('entries', 1)
//       .returning('entries')
//       .then(entries => {
//           res.json(entries[0].entries);
//       })
//       .catch(err => res.status(400).json('unable to get count'))
// }

// module.exports = {
//   handleImage
// }

handleImage = (req, res, db) => {
  const { id, imageUrl } = req.body

  clarifaiApp.models
    .predict(Clarifai.FACE_DETECT_MODEL, imageUrl)
    .then((response) => {
      const faceLocations = response.outputs[0].data.regions.map((face) => {
        const clarifaiFace = face.region_info.bounding_box
        return {
          leftCol: clarifaiFace.left_col,
          topRow: clarifaiFace.top_row,
          rightCol: clarifaiFace.right_col,
          bottomRow: clarifaiFace.bottom_row,
        }
      })

      // Update entries in the database
      return db("users")
        .where("id", "=", id)
        .increment("entries", 1)
        .returning("entries")
        .then((entries) => {
          res.json({ entries: entries[0], faceLocations })
        })
        .catch((err) => res.status(400).json("unable to update entry count"))
    })
    .catch((err) => res.status(400).json("unable to work with API"))
}

module.exports = {
  handleImage,
}
