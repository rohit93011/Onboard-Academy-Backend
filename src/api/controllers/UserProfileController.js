import UserProfile from "../models/UserProfile";


export default {
  getProfile(req, res) {
    const userId = req.decoded.id.toString();
    UserProfile.findOne({ user: userId })
      .populate({ path: "user", select: "name email" })
      .populate("origin")
      .populate({
        path: "institution",
        populate: {
          path: "location",
        },
      })
      .exec((err, userProfile) => {
        if (err) {
          throw err;
        } else {
          res.json(userProfile);
        }
      });
  },

  updateProfile(req, res) {
    const requestData = req.body;

    const userId = req.decoded.id.toString();
    UserProfile.findOne({ user: userId }).exec((err, userProfile) => {
      if (err) {
        throw err;
      } else {
        userProfile.mobile = requestData.mobile ? requestData.mobile : userProfile.mobile;
        // if (requestData.mobile) {
        //   userProfile.mobile = requestData.mobile;
        // }
        if (requestData.origin) {
          userProfile.origin = requestData.origin;
        }
        if (requestData.institution) {
          userProfile.institution = requestData.institution;
        }
        if (requestData.facebookUrl) {
          userProfile.facebookUrl = requestData.facebookUrl;
        }
        userProfile.program = requestData.program ? requestData.program : userProfile.program;
        userProfile.session = requestData.session ? requestData.session : userProfile.session;
        userProfile.save((error) => {
          if (error) {
            throw error;
          } else {
            res.json(userProfile);
          }
        });
      }
    });
  },
};
