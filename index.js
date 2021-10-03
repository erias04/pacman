import { LEVEL, OBJECT_TYPE } from './setup';

// DOM Elements from index.html
const gameGrid = document.querySelector('#gameGrid');
const scoreTable = document.querySelector('#score');
const startButton = document.querySelector('#start-button');

// Game Constants
const POWER_PILL_TIME = 10000; // milliseconds