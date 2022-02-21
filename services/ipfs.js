const axios = require("axios");
const { toast } = require("react-toastify");

const pinata_api_key = process.env.NEXT_PUBLIC_WEB3_HELPER_API_KEY;
const pinata_secret_api_key = process.env.NEXT_PUBLIC_WEB3_HELPER_API_SECRET;

const saveJSONToIPFS = async (data) => {
  try {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    let response = await axios.post(url, data, {
      headers: {
        pinata_api_key,
        pinata_secret_api_key,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong!");
  }
};

const getJSONFromIPFS = async (ipfshash) => {
  try {
    const url = `https://gateway.pinata.cloud/ipfs/${ipfshash}`;
    let response = await axios.get(url);
    return response;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong!");
  }
};

const deleteOldIPFSData = async (data) => {
  try {
  } catch (error) {}
};

export { saveJSONToIPFS, getJSONFromIPFS };
