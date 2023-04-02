const bucketModel = require("../mongodb/models/Bucket");

module.exports.addBucket = async (req, res) => {
  const { name, desc } = req.body;

  try {
    const post = await bucketModel.create({
      bname: name,
      desc: desc,
    });

    if (post) {
      res.status(201).json({
        msg: "New Bucket is Created",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

module.exports.removeBucket = async (req, res) => {
  const { id } = req.body;
  console.log(id)
  try {
    const deletedPost = await bucketModel.findByIdAndDelete(id);
    console.log(deletedPost);
    if (deletedPost) {
      res.status(200).json({
        msg: "Deleted Successfully",
      });
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports.renameBucket = async (req, res) => {
  const { id, newName } = req.body;
  try {
    const renamed = await bucketModel.findByIdAndUpdate(id, {
      $set: { bname: newName },
    });

    if (renamed) {
      res.status(200).json({
        msg: "Bucket is renamed",
      });
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports.getBuckets = async (req, res) => {
  try {
    const buckets = await bucketModel.find({}).populate("cards").exec();

    res.status(200).send(buckets);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports.moveCards = async (req, res) => {
  const { oldBucketId, newBucketId, cardId } = req.body;

  try {
    const removedId = await bucketModel.findByIdAndUpdate(oldBucketId, {
      $pull: { cards: cardId },
    });

    if (removedId) {
      const newBucket = await bucketModel.findByIdAndUpdate(newBucketId, {
        $push: { cards: cardId },
      });

      if (newBucket) {
        res.status(200).json({
          msg: "Successfully moved the card",
        });
      }
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports.getSingleBucket = async (req, res) => {
  try {
    const bucket = await bucketModel
      .find({
        _id: req.params.id,
      })
      .populate("cards")
      .exec();

    res.status(200).send(bucket);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
