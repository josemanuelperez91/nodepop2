const express = require('express');
const router = express.Router();
const { query, check, validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');
