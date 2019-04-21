"use strict";
// Sắp xếp theo quền ưu tiên thấp đến cao
module.exports = {
    nameAttribute: 'role', // Tham số phải được lưu trong userSession
    role: {
        user: 1,
        poster: 2,
        admin: 3
    },
};