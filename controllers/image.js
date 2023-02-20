const handleAPICall = (req, res) => {
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": "clarifai",
            "app_id": "main"
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": req.body.input
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': process.env.API_KEY
        },
        body: raw
    };

    fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, requestOptions)
        .then(response => response.text())    
        .then(result => {
            console.log(result)
            res.json(result)
        })
        .catch(err => res.status(400).json('unable to work with API'))
}

handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries);
        })
        .catch(err => res.status(400).json('unable to get count'))
}

module.exports = {
    handleImage,
    handleAPICall
}