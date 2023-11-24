import User from "../models/User.js";

export const create = async (req, res) => {
  try {
    const { response_description, sender_id, response_code } = req.body;
    console.log(req.body);
    const date = new Date();
    const timezone = "Africa/Lusaka";
    const options = {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    if (
      (response_description === "Payment success" ||
        response_description === "Success") &&
      (response_code == 100 || response_code == "100")
    ) {
      const user = await User.findOne({ phone_number: sender_id });
      if (user === null) {
        const newUser = await User.create({
          phone_number: sender_id,
          count: 1,
        });
        console.log({ newUser: newUser });
        if (!Boolean(newUser))
          res.json({ message: "There was an error registering the user" });
        else res.json({ message: "User created successfully" });
        return;
      }

      const updatedUser = await User.findOneAndUpdate(
        { phone_number: sender_id },
        {
          count: user.count + 1,
          modifiedAt: formattedDate,
        }
      );
      console.log(updatedUser);
      console.log({ message: "User updated" });
      res.json({ message: "User updated." });
    } else {
      console.log({ message: "The payment was not successful." });
      return res.json({ message: "The payment was not successful." });
    }
  } catch (error) {
    res.json({
      ussd_response: {
        USSD_BODY:
          "Sorry there was an issue with the server. Try again latter.", // Contains your response to client as a string
        REQUEST_TYPE: "3", // where 2 is continue and 3 is termination session
      },
    });
  }
};

export const get = async (req, res) => {
  try {
    const pageCount = parseInt(req.query.page) || 1;
    const limit = (parseInt(req.query.limit) || 20) * 1;
    const skipCount = (pageCount - 1) * limit;

    const users = await User.find({})
      .sort({ createdAt: 1 })
      .limit(limit)
      .skip(skipCount);

    const usersCount = await User.find({}).countDocuments();
    //console.log(users)
    if (users === null) {
      return res.json({
        status: 400,
        participants: [],
        totalPages: 0,
        currentPage: 0,
      });
    }
    res.json({
      status: 200,
      participants: users,
      totalPages: Math.ceil(usersCount / limit),
      currentPage: pageCount,
    });
  } catch (error) {
    res.json({
      ussd_response: {
        USSD_BODY:
          "Sorry there was an issue with the server. Try again latter.", // Contains your response to client as a string
        REQUEST_TYPE: "3", // where 2 is continue and 3 is termination session
      },
    });
  }
};
