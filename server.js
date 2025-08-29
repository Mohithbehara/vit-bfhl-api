
const express = require('express');
const app = express();

app.use(express.json());

function makeUserId() {
  const fullName = (process.env.FULL_NAME || "your_full_name").toLowerCase().replace(/\s+/g, "_");
  const dob = (process.env.DOB_DDMMYYYY || "ddmmyyyy"); // e.g., 17091999
  return `${fullName}_${dob}`;
}

function classifyAndCompute(data) {
  const even_numbers = [];
  const odd_numbers = [];
  const alphabets = [];
  const special_characters = [];
  let sum = 0;
  const allLetters = [];

  for (const item of data) {
    const s = String(item);
    
    // Extract all letters from the item for concatenation
    const lettersInItem = s.match(/[A-Za-z]/g);
    if (lettersInItem) {
      allLetters.push(...lettersInItem);
    }

    // Classify the item
    if (/^[A-Za-z]$/.test(s)) {
      // Single alphabetic character
      alphabets.push(s.toUpperCase());
    } else if (/^-?\d+$/.test(s)) {
      // Numeric string (positive or negative integer)
      const n = parseInt(s, 10);
      if (n % 2 === 0) {
        even_numbers.push(s);
      } else {
        odd_numbers.push(s);
      }
      sum += n;
    } else {
      // Everything else is treated as special characters
      special_characters.push(s);
    }
  }

  // Concatenation of all alphabetical characters in reverse order with alternating caps
  const reversedLetters = allLetters.reverse();
  const concat_string = reversedLetters.map((ch, idx) => 
    (idx % 2 === 0) ? ch.toUpperCase() : ch.toLowerCase()
  ).join('');

  return {
    even_numbers,
    odd_numbers,
    alphabets,
    special_characters,
    sum: String(sum),
    concat_string
  };
}

app.get('/bfhl', (req, res) => {
  return res.status(200).json({
    operation_code: 1
  });
});

app.post('/bfhl', (req, res) => {
  try {
    const payload = req.body;
    if (!payload || !Array.isArray(payload.data)) {
      return res.status(200).json({
        is_success: false,
        user_id: makeUserId(),
        email: process.env.EMAIL || "your_email@example.com",
        roll_number: process.env.ROLL_NUMBER || "YOUR_ROLL_NUMBER",
        odd_numbers: [],
        even_numbers: [],
        alphabets: [],
        special_characters: [],
        sum: "0",
        concat_string: ""
      });
    }
    const { even_numbers, odd_numbers, alphabets, special_characters, sum, concat_string } =
      classifyAndCompute(payload.data);

    return res.status(200).json({
      is_success: true,
      user_id: makeUserId(),
      email: process.env.EMAIL || "your_email@example.com",
      roll_number: process.env.ROLL_NUMBER || "YOUR_ROLL_NUMBER",
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum,
      concat_string
    });
  } catch (e) {
    return res.status(200).json({
      is_success: false,
      user_id: makeUserId(),
      email: process.env.EMAIL || "your_email@example.com",
      roll_number: process.env.ROLL_NUMBER || "YOUR_ROLL_NUMBER",
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: "0",
      concat_string: ""
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
