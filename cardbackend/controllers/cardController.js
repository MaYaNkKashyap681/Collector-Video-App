const cardModel = require("../mongodb/models/Card");
const bucketModel = require("../mongodb/models/Bucket");


module.exports.addCard = async (req, res) => {
  const { bucketId, name, link } = req.body;

  try {
    const newCard = await cardModel.create({
      cname: name,
      clink: link,
    });
    if (newCard) {
      const addedBucket = await bucketModel.findByIdAndUpdate(bucketId, {
        $push: { cards: newCard._id },
      });
      if (addedBucket) {
        res.status(200).json({
          msg: "Card is succesfully created",
        });
      }
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports.removeCard = async (req, res) => {
  const { id } = req.body;

  try {
    const removedCard = await cardModel.findOneAndDelete(id);

    if (removedCard) {
      res.status(200).json({
        msg: "Succesfully Deleted Card",
      });
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports.updateCard = async (req, res) => {
  const { id, newName, newLink } = req.body;
  let query = "";
  if (newLink && newLink) {
    query = { cname: newName, clink: newLink };
  } else if (newName) {
    query = { cname: newName };
  } else {
    query = { clink: newLink };
  }
  try {
    const updatedCard = await cardModel.findByIdAndUpdate(id, { $set: query });

    if (updatedCard) {
      res.status(200).json({
        msg: "Card Updated Successfully",
      });
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports.getCards = async (req, res) => {
  try {
    const cards = await cardModel.find({});

    if (cards) {
      res.status(200).send(cards);
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};
