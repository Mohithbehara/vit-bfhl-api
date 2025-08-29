import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;  

app.use(cors());
app.use(express.json())

const USER_DETAILS = {
    full_name: "john_doe", 
    birth_date: "17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123" 
};

function isNumber(str) {
    return !isNaN(str) && !isNaN(parseFloat(str)) && isFinite(str);
}

function isAlphabet(str) {
    return /^[a-zA-Z]+$/.test(str);
}

function isSpecialCharacter(str) {
    return /[^a-zA-Z0-9]/.test(str) && !isNumber(str);
}

function createAlternatingCaps(alphabets) {
    const allAlphabets = alphabets.join('').split('').reverse();
    
    let result = '';
    for (let i = 0; i < allAlphabets.length; i++) {
        if (i % 2 === 0) {
            result += allAlphabets[i].toUpperCase();
        } else {
            result += allAlphabets[i].toLowerCase();
        }
    }
    return result;
}


app.get('/', (req, res) => {
  res.send('Mohith ka API!');
});

app.post('/bfhl', (req, res) => {
    try {
        if (!req.body || !Array.isArray(req.body.data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid Input"
            });
        }

        const { data } = req.body;
        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        data.forEach(item => {
            const str = String(item);
            
            if (isNumber(str)) {
                const num = parseInt(str, 10);
                sum += num;
                
                if (num % 2 === 0) {
                    even_numbers.push(str);
                } else {
                    odd_numbers.push(str);
                }
            } else if (isAlphabet(str)) {
                alphabets.push(str.toUpperCase());
            } else if (isSpecialCharacter(str)) {
                special_characters.push(str);
            }
        });

        const concat_string = createAlternatingCaps(alphabets);
        const user_id = ${USER_DETAILS.full_name}_${USER_DETAILS.birth_date};
        const response = {
            is_success: true,
            user_id: user_id,
            email: USER_DETAILS.email,
            roll_number: USER_DETAILS.roll_number,
            odd_numbers: odd_numbers,
            even_numbers: even_numbers,
            alphabets: alphabets,
            special_characters: special_characters,
            sum: sum.toString(),
            concat_string: concat_string
        };

        res.status(200).json(response);

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            is_success: false,
            error: "Internal server error"
        });
    }
});

app.listen(port, () => {    
  console.log(listening at http://localhost:${port});
});
