import web3 from "web3";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const urls = [
  "http://ec2-13-232-52-9.ap-south-1.compute.amazonaws.com/api/message/1",
  "http://ec2-13-232-52-9.ap-south-1.compute.amazonaws.com/api/message/2",
  "http://ec2-13-232-52-9.ap-south-1.compute.amazonaws.com/api/message/3",
  "http://ec2-13-232-52-9.ap-south-1.compute.amazonaws.com/api/message/4",
  "http://ec2-13-232-52-9.ap-south-1.compute.amazonaws.com/api/message/5",
];

const createMessage = async (req, res) => {
  const address = req.params.address.toLowerCase();
  if (!web3.utils.isAddress(address)) {
    return res.status(406).json({ message: "Invalid address" });
  }
  const message = uuidv4().toString();

  const data = await Promise.all(
    urls.map((url) =>
      axios({
        url,
        method: "POST",
        data: JSON.stringify({ address, message }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.data)
    )
  );
  return res.status(201).json(data);
};

const rejectRequest = (req, res) => {
  return res.status(406).json({ message: "Method Not allowed" });
};

export default {
  createOne: createMessage,
  rejectRequest,
};
