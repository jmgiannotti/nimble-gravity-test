import axios from 'axios';

const BASE_URL = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net';

export const getCandidateInfo = async (email) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/candidate/get-by-email?email=${email}`
    );

    return response.data;

  } catch (error) {

    console.error("Candidate api error:", error);

    throw error;
  }
};