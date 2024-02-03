
let games = [
    {id: "1", title: "Epic Quest", platform: ["Switch"]},
    {id: "2", title: "Space Odyssey", platform: ["PC", "PS5"]},
    {id: "3", title: "Mystery Manor", platform: ["PS5", "XBOX", "Tablet"]},
    {id: "4", title: "Racing Legends", platform: ["Switch"]},
    {id: "5", title: "Puzzle Paradise", platform: ["PS5", "PC", "XBOX"]},
]


let authors = [
    {id: "1", name: "Alice Johnson", verified: true},
    {id: "2", name: "Bob Smith", verified: false},
    {id: "3", name: "Catherine Lee", verified: true},
];


let reviews = [
    {id: "1", rating: 9, content: "Incredible game with stunning graphics!", game_id: "1", author_id: "1"},
    {id: "2", rating: 4, content: "Great gameplay, but the story could be better.", game_id: "2", author_id: "2"},
    {id: "3", rating: 3, content: "Average experience, nothing new.", game_id: "3", author_id: "3"},
    {id: "4", rating: 2, content: "Below expectations, quite buggy.", game_id: "4", author_id: "1"},
    {id: "5", rating: 7, content: "Disappointing, would not recommend.", game_id: "5", author_id: "3"},
    {id: "6", rating: 4, content: "Really fun and engaging, great for all ages.", game_id: "2", author_id: "3"},
    {id: "7", rating: 8, content: "Masterpiece of game design, must-play!", game_id: "1", author_id: "2"},
];
 

export default {games, authors, reviews}

