import fetch from "node-fetch"

const handleApiCall = (req, res) => {
  const imageUrl = req.body.input
  const returnClarifaiRequestOptions = (url) => {
    const raw = JSON.stringify({
      user_app_id: {
        user_id: "clarifai",
        app_id: "main",
      },
      inputs: [
        {
          data: {
            image: {
              url: url,
            },
          },
        },
      ],
    })

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: process.env.CLARIFAI_API_KEY,
      },
      body: raw,
    }
    return requestOptions
  }

  fetch(
    `https://api.clarifai.com/v2/models/face-detection/outputs`,
    returnClarifaiRequestOptions(imageUrl)
  )
    .then((response) => response.text())
    .then((data) => {
      res.json(data)
    })
    .catch((err) => res.status(400).json("unable to work with API"))
}

const handleImage = (req, res, db) => {
  const { id } = req.body
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0].entries)
    })
    .catch((err) => res.status(400).json("unable to get count"))
}

export default {
  handleApiCall: handleApiCall,
  handleImage: handleImage,
}
