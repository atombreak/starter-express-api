import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

const generateUniqueString = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}


export const create = async(req, res) => {
    // Validate request
    try {
        const { MSISDN } = req.query;
        let phone = MSISDN;
        const token = 'LPLSECK-99587279c3ad4b7daa20265a9da28aae'; // Replace with your actual token environment variable
        //let resJson = {};
        let amount = 2.00;
        let currency = "ZMW";

        setTimeout(async() => {
            const resJson = await axios.post(
                'https://lipila-prod.hobbiton.app/transactions/mobile-money', {
                    currency: currency,
                    amount: amount,
                    accountNumber: phone,
                    fullName: `Zipezemo Participant-${phone}`,
                    phoneNumber: phone,
                    email: 'user@gmail.com',
                    externalId: Date.now().toString(),
                    narration: 'Zipezemo Games show',
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log(resJson.data);

            return res.status(200).json({
                transactionId: resJson.data.transactionId,
                status: resJson.data.status,
            });

        }, 1500);

    } catch (error) {
        let response_msg = 'Sorry there was an issue on the server. Try again latter.';
        console.log(error);
        res.status(200).json({
            msg: response_msg,
        });
    }
};


export const get = (req, res) => {
    try {
        res.send({ message: "" });
    } catch (error) {
        res.json({
            ussd_response: {
                USSD_BODY: 'Sorry there was an issue with the server. Try again latter.', // Contains your response to client as a string
                REQUEST_TYPE: "3", // where 2 is continue and 3 is termination session
            },
        })
    }
};